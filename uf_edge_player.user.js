// ==UserScript==
// @name         UFEdge Player
// @namespace    http://github.com/vaibhav-y/gator_grease
// @require      http://code.jquery.com/jquery-latest.js
// @version      0.2.0
// @description  A better UFEdge video player
// @author       Vaibhav Yenamandra
// @match        *://www.ufedge.ufl.edu/*
// ==/UserScript==

(function() {
    'use strict()';

    // @FIXME For now let's assume download all lectures will have download links & play links
    // which makes it so that all DL links occur at even odd positions in the above array
    var downLinks = $("#tablecontainer > div.divLectures > div.divLectureContent > a:odd");

    // Remove old stuff
    $("#tablecontainer > div.divLectures").remove();

    // Add a new div & set its properties / styles
    $("#tablecontainer").append("<div id='playlist-container'><ol id='edgePlaylist'></ol></div>");
    $("#edgePlaylist").css({
        "width": "240px",
        "padding-left": "50px",
        "text-decoration": "underline",
        "color": "#0000EE",
        "list-style": "none",
        "margin": "0"
    });

    // Add links to the list of videos on the left hand side
    downLinks.each(function(index) {
        var list = $("<li/>", {
            id: "lecture_link_" + index,
            "class": "edgeplayer_link",
            text: "Watch Lecture " + (index + 1),
            "data-video": $(this).attr("href")
        });
        $("#edgePlaylist").append(list);
    });

    // Add an onclick handler to create a video element somewhere in the middle 
    // of the page for better visibility
    $(".edgeplayer_link").on("click", function() {
        $('.lecture_video').remove();
        var video = $('<video />', {
            "class": "lecture_video",
            src: $(this).attr("data-video"),
            type: 'video/mp4',
            controls: true
        });
        video.css({
            "width": "100%"
        });

        // Minor formatting & arrangement
        $("#metacontainer > i").before(video);
        $("metacontainer > video").after("<br/>");
    });

    // Some final styling. Mainly fixing the #metacontainr width
    // and centering the UFEdge logo
    $("#metacontainer").css({"width": "800px"});

    $("#metacontainer > a > img").css({
        "margin": "0 auto",
        "position": "relative",
        "float": "none",
        "display": "block",
        "clear": "both"
    });
})();
