
$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "Qué no podamos estar juntos no significa que no te ame y no pueda hacer esto",
        desc: ""
    }, {
        title: "Quisiera poder olvidarte",
        desc: "Pero como olvidar a alguien que nunca he podido dejar de amar, fuiste la razón por la que me despertaba más feliz por las mañanas y la razón por la cual siempre llegaba feliz a mi casa después de abrazarte y besarte, tal vez no signifique nada para ti ahora, pero para mi siempre valdra mucho mas. Aunque mi vida se ha sentido como una pregunta sin respuesta, una serie de días y noches esperando darle un significado a algo, no sabía que pero Isabel, siento que estamos conectados, donde quiera que esté, te siento."
    }, {
       title: "",
       desc: "Algún día te darás cuenta que en verdad te he querido como a nadie he podido querer, que te he querido mucho más de lo que puedas imaginar y un poco más de lo que el tiempo me permitió convivir contigo,  porque empecé a quererte sin querer, fue una pena no poder entender tus motivos por los cuales me dejaste de querer y aún así no me importó porque me enseñaste lo que es querer a alguien de verdad sin miedo. Espero que en este nuevo año lleguen las cosas que siempre esperaste que llegasen, las recibas con los brazos abiertos porque te mereces todo lo bueno que pueda ocurrirte, créeme, te lo mereces."
    }, {
        title: "",
        desc: "Te ruego porque mi corazón me dice que vales la pena, no por falta de dignidad. Te pido perdón porque reconozco mis errores que cometí contigo, no porque sea débil mi corazón. Te extraño porque fue hermoso lo que viví contigo, no porque no pueda vivir sin ti. Solo me pregunto como haces para tratarme como un extraño porque yo estoy queriéndote siempre. Me costó una vida encontrar a alguien que sepa quererme como tú, alguien como tú, encontrarte y tal vez me va a costar dos vidas olvidarte."
    }, {
        title: "¿Qué te impedía estar conmigo si yo te quería tanto?",
        desc: "Puedo hacer muchas cosas pero cuando contaste mis errores y decidiste alejarte de mi por siempre, se te olvidaron todas las cosas bonitas que hice por ti, pero aún así no me importó porque la forma en que te quise nadie más lo conocerá, porque lo que sentí contigo no lo repetiré por nadie más. Reconozco que no puedo soltarte porque al final de esto una parte de ti se quedó conmigo. Solo quisiera sentarme contigo a hablar, tener esa conversación madura de lo que aún no puedo entender, aunque tus motivos sean mas fuerte que mis ganas de amarte y que exista mil razones para dejarte ir, siempre habrá una sola razón para esperarte. Solo quisiera que no olvides el día que nos conocimos, ese mensaje de ig que me contestaste, todas esas cosas que nos hacían reir, no olvides la primera vez que te dije que te amaba y lo lindo que se escucho que me digas que tambien me querías, no te olvides de las veces que nos quedabamos hablando hasta tarde, no te olvides las veces que nos decíamos que nos extrañabamos porque estabamos ocupados, y por último no olvides que aún te amo."
 }];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to 
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});
