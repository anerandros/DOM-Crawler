# DOM-Crawler
This is a simple DOM Crawler base on JavaScript. You can select your context area with a simple jQuery-like selector and retrieve all data in that context.

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

### Load JS librarys
Load the *Crawler* class.
```
<script src="js/crawler.js"></script>
```

### Istance the class
Istancing the class without extended parameters is easy:

```var crawler = new Crawler();```

In this case, ***no selector*** is setted. You will need to retrieve data adding also a jQuery-like selector:

```var data = crawler.getData('#myForm');```

You can also declare the selector while istancing and retrieve data without specifying the selector.

```
var inputCrawler = new Crawler('#myForm'); // All inputs in #myForm
var data = inputCrawler.getData();
```


### Default parameters
Without using extended settings, the *Crawler* class will look for ```input``` tags with ```data-auto-capture``` attribute. Extra data can be passed through ```data-extra``` attribute.

### Extended parameters
~~In the case you are using extendend settings while istancing the *Crawler* class~~ *In progress*
