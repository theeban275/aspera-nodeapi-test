// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
  // SDK Location.  This example is using the Aspera hosted version,
  // but this would be your hosted version if hosting your own connect
  var CONNECT_INSTALLER = '//d3gcli72yxqn2z.cloudfront.net/connect/v4';
  var asperaWeb = new AW4.Connect({
    sdkLocation: CONNECT_INSTALLER,
    minVersion: '3.6.0'
  });
  var asperaInstaller = new AW4.ConnectInstaller({
    sdkLocation: CONNECT_INSTALLER
  });
  var statusEventListener = function (eventType, data) {
    var status = AW4.Connect.STATUS;
    if (eventType === AW4.Connect.EVENT.STATUS) {
      if (data === status.INITIALIZING) {
        asperaInstaller.showLaunching();
      }
      if (data === status.FAILED) {
        asperaInstaller.showDownload();
      }
      if (data === status.OUTDATED) {
        asperaInstaller.showUpdate();
      }
      if (data === status.RUNNING) {
        asperaInstaller.connected();
      }
    }
  };
  asperaWeb.addEventListener(AW4.Connect.EVENT.STATUS, statusEventListener);
  asperaWeb.initSession();

  $('.download-btn').click(function() {
    file = $(this).closest('.download-file').find('.file').text();
    $.post('/shares/download_setup', {file: file}, function(data) {
      transfer_spec = data['transfer_specs'][0]['transfer_spec'];
      connect_settings = {
      }
      transfer_spec['remote_user'] = 'aspera';
      transfer_spec['authentication'] = 'token';
      console.log('starting transfer');
      console.log(transfer_spec);
      asperaWeb.startTransfer(transfer_spec, connect_settings, {
        error: function(obj) {
          console.log(obj);
          alert('download failed.');
        },
        success: function() {
        }
      });
    });
    return false;
  });
});

