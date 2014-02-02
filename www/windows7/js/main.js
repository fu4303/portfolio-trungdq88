var soundStack = {};

function playsound(soundname) {
    createjs.Sound.play(soundname);
}


$(function() {

    /**********************************
    ASSIGN ELEMENTS
    **********************************/
    Windows.Screen = $('body>screen');
    Windows.StartMenu = Windows.Screen.find('startmenu');
    Windows.StartMenuPanel.setDOM(Windows.Screen.find('startmenupanel'));
    Windows.AllWindows = $('window');

    /**********************************
    BIND EVENTS
    **********************************/
    /** Remove default right click behavior **/
    document.oncontextmenu = function() {return false;};

    /** Keep window size 16:9 **/
    // $(window).resize(function(){
    //     Windows.Screen.css('width', Windows.Screen.height() * Windows.ScreenWidth / Windows.ScreenHeight);
    // }).resize();

    /** Icon draggable **/
    Windows.Screen.find('icon').draggable();

    /** Windows draggable & resizeable **/
    Windows.setWindowsMoveable(Windows.AllWindows, true);

    /** Icon mouse events **/
    Windows.Screen.on('mousedown', 'icon', function(e) {
        var theIcon = $(this);
        if (e.button == Windows.MOUSE_LEFT_BUTTON) {
            // Select icon
            // TODO: more condition (Ctrl key, Shift key)
            Windows.setFocusTo(theIcon);
        } else if (e.button == Windows.MOUSE_MIDDLE_BUTTON) {
            // Show context menu
        }
    });

    /** Desktop mouse events **/
    Windows.Screen.on('mousedown', 'desktop', function(e) {
        // No include icon click.
        if (e.target !== this) return;

        if (e.button == Windows.MOUSE_LEFT_BUTTON) {
            // Deselect icon
            // TODO: more condition (Ctrl key, Shift key)
            Windows.setFocusTo($(this));
        } else if (e.button == Windows.MOUSE_MIDDLE_BUTTON) {
            // Show context menu
        }
    });

    /** Set focus for windows **/
    WindowsManager.initWindowsEvents();
    

    /** Trigger start menu **/ 
    Windows.StartMenu.click(function(e) {
        if (Windows.StartMenuPanel.isOpen()) {
            Windows.setFocusTo();
        } else {
            Windows.setFocusTo(Windows.StartMenuPanel.getDOM());
        }
    });


    /** Start menu recent app launch **/
    $('.recent_program_item').click(function() {
        var appname = $(this).attr('appname');
        AppManager.StartApp(appname);
        Windows.setFocusTo();
    });

    /**********************************
    PREPARE FOR DOMs
    **********************************/
   
}); // End document ready

$(window).load(function() {
    // Turn off boot screen
    $('bootscreen').fadeOut();

    // Set default cursor
    Windows.setCursor();

    // Add a sample window
    WindowsManager.AddWindow('Hello 7', 'netbeans', 'about:blank');
    WindowsManager.AddWindow('Hello 8', 'cstrike', 'about:blank');
    WindowsManager.AddWindow('Hello 9', 'wordpress', 'about:blank');
    WindowsManager.AddWindow('Hello 10', 'war3', 'about:blank');
}); // End window load