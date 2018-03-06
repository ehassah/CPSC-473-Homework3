(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);

    if (this.$formElement.length === 0) {
      throw new Error("could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addPaymentSubmitHandler = function() {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var nameOfUser = document.getElementById("name").value;
      var title;
      if (document.getElementById("title_1").checked) {
        title = document.getElementById("title_1").value;
      } else {
        title = document.getElementById("title_2").value;
      }
      var name = "Thank you for your payment, " + title + " " + nameOfUser;
      console.log(name);
      document.getElementById("displayContent").innerHTML = name;
      $("#ex1").show();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
