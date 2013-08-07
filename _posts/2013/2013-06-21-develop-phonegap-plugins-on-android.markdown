---
layout: post
published: true
title: "Develop phonegap/cordova plugins on Android"
date: 2013-06-21 15:58:30
tags: PhoneGap Android JavaScript
categories: Phonegap
---

Recently, I dug a little further in [Phonegap](http://phonegap.com/) on writing plugins. The [official plugin development guide](http://docs.phonegap.com/en/edge/guide_plugin-development_android_index.md.html#Developing%20a%20Plugin%20on%20Android) is hard to grasp for beginner. So this is quick note.

## JavaScript Interface

Phonegap plugins allow you to use functionalities on native platform through a single JavaScript interface `cordova.exec`.

{% highlight javascript %}
cordova.exec(<successFun>, <failFun>, <service>, <action>, <args>);
{% endhighlight %}

- `successFun (Function)`: if your `exec` call completes successfully, this function is invoked (optionally with any parameters you pass back to it).
- `failFun (Function)`: if the operation does not complete successfully, this function is invoked (optionally with an error parameter).
- `service (String)`: the service name to call into on the native side.
- `action (String)`: the action name to call into. 
- `args (Array)`: arguments to pass into.

## Android

On the native platform, you needs to implement the `service` (as class name), which extends `CordovaPlugin` and overides `execute` method.

Your plugin must be added to the `config.xml` file in your Cordova-Android application's `res/xml/` folder.

{% highlight xml %}
<plugin name="<service_name>" value="<full_name_including_namespace>"/>
{% endhighlight %}

This is a plugin template:

{% highlight java linenos %}
public class YourServiceName extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext ctx) {
        if (action.equalsIgnoreCase("an action")) {
            // do some thing
            return true;
        }

        return false;
    }

}
{% endhighlight %}

- `action`: the action name passed in from the JavaScript interface.
- `args`: the arguments passed in.
- `ctx`: the callback that you can return information to JavaScript.

You can access your cordova activity and context using `this.cordova.getActivity()` and `this.cordova.getActivity().getBaseContext();`.

You can pass data back using `ctx` with `ctx.success()`, `ctx.error()` or `ctx.sendPluginResult()`.

For example, you can refer to the [source code](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/Notification.java) of `Notification` API provided by phonegap.

## JavaScript Plugin

It is better to wrap your plugin calls, instead of calling `cordova.exec` directly every time. There are two ways doing it:

### The Common Way

This is the common way found in [phonegap-plugins](https://github.com/phonegap/phonegap-plugins) repos:

{% highlight javascript linenos %}
(function(cordova){
    var YourService = function() { };

    YourService.prototype.action = function(args, succeed, failed) {
        return cordova.exec(succeed, failed, 'Service', 'Action', args);
    };

    cordova.addConstructor(function() {
        window.YourService = new YourService();

        // backwards compatibility
        window.plugins = window.plugins || {};
        window.plugins.YourService = window.YourService;
    });

})(window.PhoneGap || window.Cordova || window.cordova);

// you can call your plugin as
window.plugins.YourService.action(args, succeed, failed);
{% endhighlight %}

### The `Require` Way

This is what I found in `cordova.js`'s [source code](https://github.com/apache/cordova-android/blob/master/framework/assets/www/cordova.js#L4116):

{% highlight javascript linenos %}
cordova.define('cordova/plugin/YourService', function(require, exports, module) {    
    var exec = require("cordova/exec");

    var YourService = function() { };

    YourService.prototype.action = function(args, succeed, failed) {
        return exec(succeed, failed, 'Service', 'Action', args);
    };

    module.exports = new YourService();
});

// you can call your plugin as
var Service = cordova.require("cordova/plugin/YourService");
Service.action(args, succeed, failed);
{% endhighlight %}

The `require` is not compatible with old Phonegap (1.x).

**References**:

- [Phonegap Plugin Development Guide](http://docs.phonegap.com/en/edge/guide_plugin-development_index.md.html#Plugin%20Development%20Guide)
- [Phonegap Source Code](https://github.com/apache/cordova-android)
- [Local Notification Plugin](https://github.com/zhuochun/local-notification)
