# jQuery-DOM-Crawler
This is a simple DOM Crawler base on jQuery. You can select your context area with a simple jQuery selector and retrieve all data in that context.

## Basic setup
### HTML
You just need to attach a selector to your context area, i.e. an id attribute as ```#myForm``` in your ```<form>``` tag. You markup should seems like this:
```
<form id="myForm">
  <input type="text" name="field1" data-auto-capture data-extra="extra_data" />
  <input type="checkbox" name="field2" data-auto-capture />
  <input type="submit" name="field3" data-auto-capture />
</form>
```

### Load JS libraries
Remember to load in order always jQuery first and then *Crawler* class.
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/crawler.js"></script>
```

### Istance the class
Istancing the class without extended parameters is easy:

```var crawler = new Crawler();```

In this case, ***no selector*** is setted. You will need to retrieve data adding also a jQuery selector:

```var data = crawler.getData('#myForm');```


### Default parameters
Without using extended settings, the *Crawler* class will look for ```input``` tags with ```data-auto-capture``` attribute. Extra data can be passed through ```data-extra``` attribute.

### Extended parameters
~~In the case you are using extendend settings while istancing the *Crawler* class~~ *In progress*
