#crudGrid
This plugin is to make developers life easy when it comes to create a catalog to insert, update, delete records, the source is very simple, you just need to retrieve 
{
  rows:[val1,val2]
  ,columns:{
            col1:0
            ,col2:1
            }
  }



###Options:

- [source](https://jsfiddle.net/fabyyiola/mfjq6dce/4/): *json*
- [[mapping]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/): *array*
  - dataField: *string*
  - colText: *string*
  - [visible: *bool*]
  - [width: *string*]
  - [html: *function(value)*]
  - [css: *string*]
  - [type: *string*]
  -  [addRow]
     - [[defaultValue: *function()*|*bool*|*int*|*string*]](https://jsfiddle.net/fabyyiola/a0v85668/1/)
     - [[enabled: *bool*]](https://jsfiddle.net/fabyyiola/dLvho5th/1/)
- [[caseSensitive: *bool*]](https://jsfiddle.net/fabyyiola/dLvho5th/1/)
- [[addRow: *bool*]](https://jsfiddle.net/fabyyiola/a0v85668/1/)
- [[editable: *bool*]](https://jsfiddle.net/fabyyiola/7xya66ee/)
- [deletable: *bool*]
- [extraParamsOnSave: *function()*]
- [onRefresh: *function()*]
- [[onSave: *function(values)*]](https://jsfiddle.net/fabyyiola/a0v85668/1/)
- [[onUpdate: *function(values)*]](https://jsfiddle.net/fabyyiola/7xya66ee/)
- [onDelete: *function(row)*]
  
