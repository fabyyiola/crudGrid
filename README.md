#crudGrid
This plugin is to make developers life easy when it comes to create a catalog to insert, update, delete records, the source is very simple, you just need to retrieve 
{
  rows:[val1,val2,...]
  ,columns:{
            col1:0
            ,col2:1
            ...
            }
  }



###Options:

- [source: *json*](https://jsfiddle.net/fabyyiola/mfjq6dce/4/)
- [[mapping]: *array*](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [dataField: *string*](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [colText: *string*](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [[visible: *bool*]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [[width: *string*]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [[html: *function(value)*]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [[css: *string*]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  - [[type: *string*]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
  -  [[addRow]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/)
     - [[defaultValue: *function()*|*bool*|*int*|*string*]](https://jsfiddle.net/fabyyiola/a0v85668/1/)
     - [[enabled: *bool*]](https://jsfiddle.net/fabyyiola/a0v85668/2/)
- [[caseSensitive: *bool*]](https://jsfiddle.net/fabyyiola/dLvho5th/1/)
- [[addRow: *bool*]](https://jsfiddle.net/fabyyiola/a0v85668/1/)
- [[editable: *bool*]](https://jsfiddle.net/fabyyiola/7xya66ee/)
- [[deletable: *bool*]](https://jsfiddle.net/fabyyiola/tnwj7e1t/1/)
- [[extraParamsOnSave: *function()*]](https://jsfiddle.net/fabyyiola/0ggjmvr7/)
- [[onRefresh: *function()*]](https://jsfiddle.net/fabyyiola/vjum5bj0/)
- [[onSave: *function(values)*]](https://jsfiddle.net/fabyyiola/a0v85668/1/)
- [[onUpdate: *function(values)*]](https://jsfiddle.net/fabyyiola/7xya66ee/)
- [[onDelete: *function(row)*]](https://jsfiddle.net/fabyyiola/tnwj7e1t/3/)
  
