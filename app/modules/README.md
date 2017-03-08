# create a module

By now you should have a working *default* layout, and a **routes.json** file updated to include a *main* section. Now we're going to create a simple *home* module to display on the root page. First you'll need to create a new directory to hold the module content.
```
$> cd app/modules
$> mkdir home
$> cd home
```

Now you should have an empty directory at app/modules/home. Next lets add the required files for our module. Just like a layout, a module needs 2 files in order to work, **main.js** and **index.html**. Again, **main.js** is the entry point for the module and **index.html** is the initial view for the module.

# main.js
Create an empty **main.js** file (*app/modules/home/main.js*) and add the contents below:
```
(function (app) {
    var modulePath = 'modules/hello';

    app.controller("HomeCtrl", ['$scope', function (scope) {

    }]);
    app.publish("moduleReady", modulePath);
  }(window.app));
```
Notice the similar patterns that we used in the layout:  
1.) The immediately-invoked function expression  
2.) The *HelloCtrl* controller setup  
3.) Publishing the "moduleReady" event  


# index.html
Create an empty **index.html** file (*app/modules/home/index.html*) and add the contents below:
```
<div ng-controller="HomeCtrl">
    This is the home page
</div>
```

  
Go back to the browser and refresh your page at **http://localhost:5555**  
Now you should see the *Welcome* text, as well as *This is the home page* displayed.

# scope
Now lets add some data to the scope. The scope is angular's glue between the view and the controller. A good place to start reading about angular's scope, views, and controllers is here: http://docs.angularjs.org/tutorial/step_02
  
Update the **main.js** file to look like this:
```
(function (app) {
    var modulePath = 'modules/hello';

    app.controller("HomeCtrl", ['$scope', function (scope) {
        scope.testData = ['aaa', 'bbb', 'ccc'];
    }]);
    app.publish("moduleReady", modulePath);
  }(window.app));
  ```
  Notice we've added the line:
  ```
  scope.testData = ['aaa', 'bbb', 'ccc'];
  ```

Now in the **index.html** file let's make use of our new scope variable. Update the file to look like this:
```
<div ng-controller="HomeCtrl">
    This is the home page; testData = {{testData[0]}}
</div>
```
Notice the section within double curly braces *{{testData[0]}}*. This represents a variable. Angular will bind to the scopes *testData* property, and in this case, get the first element in the array. Refresh the browser and you should now see the text *This is the home page; testData = aaa*. Note that *aaa* in comes from the testData we set on the scope.

# views + controllers
Although this example is simple, most modules will contain a large amount of code. Having all of the code contained within only 2 files is not a good idea. A common pattern will be to place view and controller code into separate files. The directory structure for this looks like the following:  

`module root`  
└─ `controllers`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ `DetailCtrl.js`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ `ListCtrl.js`  
├─ `views`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ `detail.js`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ `list.js`  
├─ `index.html`  
└─ `main.js`  

Let's try to re-organize this module to adhere to this structure. First create new directories for *controllers* and *views*. 
```
$> cd app/modules/home
$> mkdir controllers
$> mkdir views
```

Now add an empty **welcome.html** file at *app/modules/home/views/welcome.html*, along with an empty **WelcomeCtrl.js** file at *app/modules/home/controllers/WelcomeCtrl.js*.
  
Edit the **welcome.html** file to look like the following:
```
<div ng-controller="HomeWelcomeCtrl">
    This is the home page; testData = {{testData[0]}}
</div>
```

Edit the **WelcomeCtrl.js** to look like the following:
```
(function (app) {
    app.controller("HomeWelcomeCtrl", ['$scope', function (scope) {
        scope.testData = ['aaa', 'bbb', 'ccc'];
    }]);
}(window.app));
```

Next we need to load the view into the *index.html* file at the root. In order to do this the UI framework provides a **<view-selector>** tag which gives us a declarative way of assigning views based on routes. Update the **index.html** file (*app/modules/home/index.html*) to look like the following:
```
<div ng-controller="HomeCtrl">
    <view-selector host="this" module-path="{{modulePath}}" params="model.routeParams">
        <view route="" path="views/welcome.html"></view>
    </view-selector>
</div>
```

Finally, we need to make sure we load the controllers. This is done by simply loading each script you need from the **main.js** file prior to publishing the *moduleReady* event. To do this, update the *app/modules/home/main.js* file as seen below:
```
(function (app) {
    var modulePath = 'modules/home',
        ctrlRoot = app.root + modulePath + '/controllers/';

    app.controller("HomeCtrl", ['$scope', function (scope) {
        scope.modulePath = modulePath;
        scope.model = {
          routeParams: {}
        };
    }]);
    
  $.when(
    $.getScript(ctrlRoot + 'WelcomeCtrl.js'))
    .done(function () {
      app.publish('moduleReady', modulePath);
    });
 }(window.app));
```

Notice several changes:  
1.) We're manually loading the controller, using jQuery's *getScript* method
2.) We're not publishing *moduleReady* until the *getScript* call completes
3.) We've added some new properties to the scope (*modulePath*, and *model.routeParams*)
  
Refresh the page again. The result should be the same, but now we've split out logic into separate files associated with the view.

# build your own
Next let's create a second module and bind a new route to it. Let's create a module that lists our favorite quotes, and provides additional information about each quote when clicked. Open up the **routes.json** file and add a new section. It should look like below:
```
{
  "/": {
    "title": "Home",
    "layout": "layouts/default",
    "theme": "themes/default",
    "sections": {
      "main": "modules/home"
    }
  },
  "/quotes": {
    "title": "Quotes",
    "layout": "layouts/default",
    "theme": "themes/default",
    "sections": {
      "main": "modules/quotes"
    }
  }
}
```

The module should display a list of quotes on the main view, and display more details about the quote on a detail view. Try this as an exercise on your own. To get started take the following steps:  
1.) Create a new directory at *app/modules/quotes*  
This module's file structure should mirror what we covered above:

`quotes`  
└─ `controllers`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ `DetailCtrl.js`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ `ListCtrl.js`  
├─ `views`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ `detail.js`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ `list.js`  
├─ `index.html`  
└─ `main.js`  

Fill in the files such that you get a standard list view upon visiting the page. Each list item should link to a detail view of the quote.
  
**Hints**
1.) Your *main.js* file needs to load 2 controllers now
2.) Your *index.html* file needs to have 2 <view> tags
3.) The detail view needs a route parameter, for example: route="detail/:id"