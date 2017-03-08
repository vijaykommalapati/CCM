(function(){
    app.ng=angular.module("app",['ngGrid']),
    app.publish=amplify.publish,
    app.subscribe=amplify.subscribe,
    app.unsubscribe=amplify.unsubscribe,
    app.controller=app.ng.controller,
    app.directive=app.ng.directive,
    app.factory=app.ng.factory,
    app.filter=app.ng.filter,

    app.ng.config(["$controllerProvider","$compileProvider","$filterProvider","$provide",
        function(n,t,i,r)
    {
        app.controller=n.register,
        app.directive=t.directive,
        app.factory=r.factory,
        app.filter=i.register}
    ]),
    app.ng.config(["$locationProvider",function(n)
    {
        n.html5Mode(!0)}
    ]),
    app.utils={}})(),

    app.ng.controller("AppCtrl",["$scope","$compile","$location","$window",function(n,t,i,r)
    {
        function f()
    {
        $.getJSON(app.root+"routes.json",
        function(t)
    {
        app.routes=t,app.routeParams=[],n.$apply(function()
    {
        n.$watch(function(){
                return i.path()
            }
        ,function(i)
        {
            var r="/"+i.substring(app.root.length).toLowerCase(),u,e,f;
            for(r.length>1&&r[r.length-1]=="/"&&(r=r.substring(0,r.length-1)),u=t[r],e=[];!u;)
            {if(f=r.lastIndexOf("/"),f<1)break;
                e.push(r.substring(f+1)),
                 r=r.substring(0,f),
                    u=t[r]}n.page=u,
            app.routeParams=e.reverse(),
            app.currentRoute=r
        }
            )
    }
        )
    })
    }
        n.app=app,
            n.page={},
        n.href=function(n)
        {
            return n.indexOf(!1)&&(n=n.substring(1)),
            app.root+n
        },
        app.softRefresh=function()
    {
        n.$digest()
    }
        ,app.hardRefresh=function()
        {
            r.location.reload()
        },
            n.$watch("page.title",function(n)
            {
                document.title=n||app.defaultTitle||"Welcome"
            });
        var u=null;n.$watch("page.layout",function(i)
    {
        u&&u.$destroy(),i?(u=n.$new(),
        app.utils.loadModule
            ( i,document.body,u,t)):$(document.body).empty()
    })
        ,n.$watch("page.theme",
        function(n)
        {
            app.theme&&app.theme.prop("disabled",!0)
                ,n&&(app.theme=app.utils.loadStyleSheet(app.root+n+"/main.css"),
                app.theme.prop("disabled",!1))
        })
        ,$.getJSON(app.root+"app.json",
        function(n)
        {
            var i,t;if(n&&n.require)
        {
            for(i=[],t=0;t<n.require.length;t++)
                i.push($.getScript(app.root+n.require[t]));
            $.when.apply($,i).done(function()
            {
                f()
            })}
        })
    }]),


    function(){
        var n="en-us",
        t=[];app.i18n={
        data:{},
        load:function(i,r)
        {
            return r=r||n,t.push(i),
            $.getJSON(app.root+i+"/locale/"+r+".json",
            function(n)
            {
                $.extend(app.i18n.data,n)
            }
            )
        },
        lang:function(i)
        {
            var u,f,r;if(i&&i!=n)
        {
            for(n=i,u=t,f=[],this.data={},t=[],r=0;r<u.length;r++)
                f.push(this.load(u[r],i));
            return $.when.apply($,f)
        }
            return n
        }
    }
    }(),

    app.ng.filter("localize",["$interpolate",function(n)
    {
        return function(t,i)
        {
            var r=app.i18n.data[t];
        return r?i?(angular.isFunction(r.bind)||(r.bind=n(r.text)),
            r.bind(i)):r.text:"KEY NOT FOUND"}
    }]),

    app.ng.filter("plural",function(){
        return function(n,t,i)
        {
            return n==1?t:i}
    }),


    app.ng.directive("module",["$parse","$compile",function(n,t)
    {
        return{
            restrict:"E",transclude:!0,replace:!0,scope:!1,template:'<div class="module" ng-transclude><\/div>',
        link:function(i,r,u)
        {
            var e=n(u.path),
                f=null;i.$watch(function(){return e(i)},
            function(n)
            {
                f&&f.$destroy(),
                    n?(f=i.$new(),
                        app.utils.loadModule(n,r,f,t)):$(r).empty()
            })
        }}
    }]),

    app.ng.directive("viewSelector",["$parse","$compile",
        function(n,t){
            return{
                restrict:"E",replace:!0,transclude:!0,scope:{modulePath:"@",params:"=",host:"="},
            template:'<div class="view" ng-transclude><\/div>',link:function(n,i)
                {
                    var r=null;n.params={},
                n.$watch(function()
                {
                    return app.routeParams},
                    function(u)
                    {
                        var e,o,f;for(u||(u=[]),r&&r.$destroy(),
               n.params={},e=i.data("/")||{},f=0;f<u.length;f++)if(e[u[f]])e=e[u[f]];else if(e["/var"])e=e["/var"];
                else
                    {
                        i.empty();
                        return}
                        if(!e["/path"]){i.empty();
                    return}
                        if(o=e["/params"],o&&o.length)
                            for(f=0;f<o.length;f++)
                                n.params[o[f].name]=u[o[f].index];
                    r=n.host.$new(),
                        i.load(app.root+n.modulePath+"/"+e["/path"],
                            function()
                    {
                        n.$apply(function()
                        {t($(i)[0].firstChild)(r)
                        })
                    })
                    })
                }}
        }]),

    app.ng.directive("view",["$parse","$compile",function()
    {
        return{restrict:"E",
        replace:!1,scope:!1,link:function(n,t,i)
            {
                var r=t.parent().data(),
                    f=i.route.split("/"),
            e=[],
                    u;for(r["/"]||(r["/"]={}),r=r["/"],u=0;u<f.length;u++)f[u].indexOf(":")==0?(r["/var"]||(r["/var"]={}),
            e.push({name:f[u].substring(1),
                index:u}),r=r["/var"]):f[u]&&(r[f[u]]||(r[f[u]]={}),r=r[f[u]]
                );
            r["/path"]=i.path,r["/params"]=e}
        }}
    ]),

    app.ng.directive("importCss",function(){
        return{
            restrict:"E",replace:!0,scope:!1,
        template:"<style><\/style>",
            link:function(n,t,i)
            {t.html('@import "'+app.root+i.src+'";')}
        }
    }),

    function(){
        var t={},
            n=!1;app.utils.loadModule=function(i,r,u,f)
    {
        if(n)setTimeout(function()
    {
        app.utils.loadModule(i,r,u,f)},0);
        else
        {
            n=!0;var e=function()
            {
        app.unsubscribe("moduleReady",e),
            n=!1,r=$(r),r.empty(),
            r.prepend("<div>"),
        r.children().first().load(app.root+i+"/index.html",function()
        {
            u.$apply(function(){f($(r)[0].firstChild)(u)}
            )}
        )};

        app.subscribe("moduleReady",e),t[i]?app.publish("moduleReady",i):(t[i]=1,
            app.utils.loadScript(app.root+i+"/main.js"))
        }}
    }(),

    function(){
        var n={};
    app.utils.loadScript=function(t)
    {
        return t=t.toLowerCase(),n[t]||(n[t]=$.getScript(t)),n[t]}
    }(),

    function(){
        var n={};
        app.utils.loadStyleSheet=function(t)
        {
            return t=t.toLowerCase(),
            n[t]||(n[t]=$("<link>").appendTo($("head")).attr({type:"text/css",rel:"stylesheet"}).attr("href",t)),n[t]
        }
    }()