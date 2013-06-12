var hackathon_invite = {
  gvar : {
    backgroundMusic       : new Audio("songs/mycopcar.ogg"),
    introBackgroundMusic  : new Audio("songs/moonwalk.ogg")
  },
  el : {
    browserWindow         : $(window),
    browserWindowDocument : $(document),
    body                  : $('body'),
    currentInput          : $("#current-input"),
    c64Output             : $(".c64-output"),
    inviteLoadingScreen   : $(".invite-loading"),
    inviteScreen          : $(".invite"),
    mainArticle           : $("#main-article"),
    closeButton            : $("#close"),
    upButton              : $("#up"),
    downButton            : $("#down"),
    mainArticleAudio      : $("#main-article-audio"),
    inviteLoadingAudio    : $("#invite-loading-audio")
  },
  init : function () { 
    this.gvar.backgroundMusic.loop = true;
    this.bindUIElements();
  },
  bindUIElements : function () {
   this.el.browserWindowDocument.keydown(this.registerKey);
   this.el.upButton.on("click", this.moveArticle);
   this.el.downButton.on("click", this.moveArticle);
   this.el.closeButton.on("click", this.closeArticle);
  },
  registerKey : function (event) {
    switch(event.which) {
      case 8:
        event.preventDefault(); 
          hackathon_invite.el.currentInput.text(hackathon_invite.backspace(hackathon_invite.el.currentInput.text()));
        break;
      case 9:
        event.preventDefault();
        hackathon_invite.addOutputLine("There was no tab completion in 1984. Recognize!", hackathon_invite.checkOverflow);
        break;  
      case 13:
        hackathon_invite.inputInterpreter(function () {
          hackathon_invite.clearInput();
        });
        break;  
      default:
        if(event.which == "190") {
          hackathon_invite.el.currentInput.append(".");
          break;
        }
        hackathon_invite.el.currentInput.append(String.fromCharCode(event.which));
      break; 
    }
  },
  inputInterpreter : function (callback) {
    switch(hackathon_invite.el.currentInput.text().toUpperCase()) {
      case 'LIST':
        hackathon_invite.addOutputLine("Files available", hackathon_invite.checkOverflow);
        hackathon_invite.addOutputLine("invite.j64", hackathon_invite.checkOverflow);
        hackathon_invite.addOutputLine("", hackathon_invite.checkOverflow);
        break;
      case 'LOAD':
        hackathon_invite.addOutputLine("please specify which file to load", hackathon_invite.checkOverflow);        
        break;
      case 'LOAD INVITE.J64':
        hackathon_invite.el.inviteLoadingScreen.addClass("show-block");
        this.gvar.backgroundMusic.pause();
        hackathon_invite.gvar.introBackgroundMusic.play();
        setTimeout(hackathon_invite.loadInvite, 10000);
        break;
      case '?' :
        hackathon_invite.addOutputLine("Available commands: list, load, music, help, clear", hackathon_invite.checkOverflow);
        break;
      case 'HELP' :
        hackathon_invite.addOutputLine("Available commands: list, load, music, help, clear", hackathon_invite.checkOverflow);
        break;
      case 'CLEAR' :
        hackathon_invite.clearLines();
        break;        
      case 'MUSIC':
      hackathon_invite.addOutputLine("Please specify if you want it ON or OFF", hackathon_invite.checkOverflow);
        break;
      case 'MUSIC ON':
        this.gvar.backgroundMusic.play();
        hackathon_invite.addOutputLine("The music is now ON!", hackathon_invite.checkOverflow);
        break;
      case 'MUSIC OFF':
        this.backgroundMusic.pause();
        hackathon_invite.addOutputLine("Music was turned OFF", hackathon_invite.checkOverflow);
        break;
      default:
        hackathon_invite.addOutputLine("Invalid command: " + hackathon_invite.el.currentInput.text(), hackathon_invite.checkOverflow);
        hackathon_invite.addOutputLine("Type help for list of commands. (DO NOT USE SHIFT WHILE TYPING)", hackathon_invite.checkOverflow);
        break;
    }
    callback();
  },
  loadInvite : function () {
    hackathon_invite.gvar.backgroundMusic.currentTime = 0;
    hackathon_invite.gvar.backgroundMusic.play();
    hackathon_invite.el.inviteScreen.addClass("show-block");
  },
  addOutputLine : function (output, callback) {
    var element = $('<p>').html(output);
    $('.c64-output > p:last').after(element);
    callback();
  },
  clearLines : function () {
    $(".c64-output > p ").html("");
    hackathon_invite.el.c64Output.animate({marginTop: '0em'},0);
  },
  clearInput : function () {
    hackathon_invite.el.currentInput.empty();
  },
  checkOverflow : function () {
    var element = document.querySelector('.c64-output');
    if((element.scrollHeight-element.offsetHeight) > 2) {
      hackathon_invite.el.c64Output.animate({marginTop: '-=1.2em'},0);
    }
  },
  backspace : function (mystring) {
    return mystring.substr(0, mystring.length - 1);
  },
  moveArticle : function (event) {
    switch(event.target.id) {
      case 'down' : 
        hackathon_invite.el.mainArticle.animate({marginTop: '-=4em'}, 100); 
        break;
      case 'up' : 
        hackathon_invite.el.mainArticle.animate({marginTop: '+=4em'}, 100); 
        break;
    }
  },
  closeArticle : function(event) {
    hackathon_invite.el.inviteLoadingScreen.removeClass('show-block');
    hackathon_invite.el.inviteScreen.removeClass('show-block');
    hackathon_invite.gvar.backgroundMusic.pause();
  }
};

hackathon_invite.init();