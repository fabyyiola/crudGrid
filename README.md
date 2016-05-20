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

- source: *json*
- [Mapping](http://google.com): *array*
  - dataField: *string*
  - colText: *string*
  - [visible: *bool*]
  - [width: *string*]
  - [html: *function(value)*]
  - [css: *string*]
  - [type: *string*]
  -  [addRow]
     - [defaultValue: *function()*|*bool*|*int*|*string*]
     - [enabled: *bool*]
- [caseSensitive: *bool*]
- [addRow: *bool*]
- [editable: *bool*]
- [deletable: *bool*]
- [extraParamsOnSave: *function()*]
- [onRefresh: *function()*]
- [onSave: *function(values)*]
- [onUpdate: *function(values)*]
- [onDelete: *function(row)*]
  
