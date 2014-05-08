$(document).ready(function() {
i18n.init(function(t) {
  // translate nav
  $(".nav").i18n();
  $(".document-wrapper").i18n();
  
  // programatical access
  var appName = t("app.i18nlexoffice");
});

});

