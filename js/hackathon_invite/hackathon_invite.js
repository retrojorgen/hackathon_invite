var hackathon_invite = {
  gvar : {
  },
  el : {
    browserWindow : $(window),
    browserWindowDocument : $(document),
    body : $('body'),
    currentInput : $("#current-input"),
    c64Output : $(".c64-output"),
    inviteLoadingScreen : $(".invite-loading"),
    inviteScreen : $(".invite")
  },
  init : function () {
    this.bindUIElements();
  },
  bindUIElements : function () {
   this.el.browserWindowDocument.keydown(this.registerKey);
  },
  registerKey : function (event) {
    switch(event.which) {
      case 8:
        event.preventDefault(); 
        hackathon_invite.el.currentInput.text(hackathon_invite.backspace(hackathon_invite.el.currentInput.text()));
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
        console.log(event.which);        
        hackathon_invite.el.currentInput.append(String.fromCharCode(event.which));
      break; 
    }
  },
  inputInterpreter : function (callback) {
    switch(hackathon_invite.el.currentInput.text()) {
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
        setTimeout(hackathon_invite.loadInvite, 10000);
        break;
      case '?' :
        hackathon_invite.addOutputLine("Available commands: list, load, help, clear", hackathon_invite.checkOverflow);
        break;
      case 'HELP' :
        hackathon_invite.addOutputLine("Available commands: list, load, help, clear", hackathon_invite.checkOverflow);                        
        break;
      case 'CLEAR' :
        hackathon_invite.clearLines();
        break;        
      default:
        hackathon_invite.addOutputLine("Invalid command: " + hackathon_invite.el.currentInput.text(), hackathon_invite.checkOverflow);
        hackathon_invite.addOutputLine("Try help for list of commands. ", hackathon_invite.checkOverflow);
        break;
    }
    callback();
  },
  loadInvite : function () {
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
  }
};

hackathon_invite.init();