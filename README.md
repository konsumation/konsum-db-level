[![npm](https://img.shields.io/npm/v/@konsumation/db.svg)](https://www.npmjs.com/package/@konsumation/db)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Open Bundle](https://bundlejs.com/badge-light.svg)](https://bundlejs.com/?q=@konsumation/db)
[![downloads](http://img.shields.io/npm/dm/@konsumation/db.svg?style=flat-square)](https://npmjs.org/package/@konsumation/db)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkonsumation%2Fkonsum-db%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/konsumation/konsum-db/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/konsumation/konsum-db/badge.svg)](https://snyk.io/test/github/konsumation/konsum-db)

# konsum-db

timeseries database on leveldb

# example

```js
import levelup from "levelup";
import leveldown from "leveldown";

import { Master, Category } from "konsum-db";

async function example() {
 // open database
 const db = await levelup(leveldown("example.db"));
 const master = await Master.initialize(db);

 // create category named EV
 const ev = new Category("EV", master, { unit: "kWh" });
 await ev.write(master.db);
 
 // write entry
 await ev.writeValue(db, Date.now(), 77.34);
}

example();
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Attribute](#attribute)
    *   [Properties](#properties)
*   [definePropertiesFromOptions](#definepropertiesfromoptions)
    *   [Parameters](#parameters)
*   [defaultValues](#defaultvalues)
    *   [Parameters](#parameters-1)
*   [setAttribute](#setattribute)
    *   [Parameters](#parameters-2)
*   [getAttribute](#getattribute)
    *   [Parameters](#parameters-3)
*   [optionJSON](#optionjson)
    *   [Parameters](#parameters-4)
*   [mapAttributes](#mapattributes)
    *   [Parameters](#parameters-5)
*   [mapAttributesInverse](#mapattributesinverse)
    *   [Parameters](#parameters-6)
*   [Base](#base)
    *   [Parameters](#parameters-7)
    *   [Properties](#properties-1)
    *   [key](#key)
    *   [write](#write)
        *   [Parameters](#parameters-8)
    *   [readDetails](#readdetails)
        *   [Parameters](#parameters-9)
    *   [delete](#delete)
        *   [Parameters](#parameters-10)
    *   [keyPrefix](#keyprefix)
    *   [keyPrefixWith](#keyprefixwith)
        *   [Parameters](#parameters-11)
    *   [typeName](#typename)
    *   [attributes](#attributes)
    *   [entries](#entries)
        *   [Parameters](#parameters-12)
    *   [entriesWith](#entrieswith)
        *   [Parameters](#parameters-13)
    *   [entry](#entry)
        *   [Parameters](#parameters-14)
*   [description](#description)
*   [Category](#category)
    *   [Parameters](#parameters-15)
    *   [Properties](#properties-2)
    *   [valueKey](#valuekey)
        *   [Parameters](#parameters-16)
    *   [writeValue](#writevalue)
        *   [Parameters](#parameters-17)
    *   [getValue](#getvalue)
        *   [Parameters](#parameters-18)
    *   [deleteValue](#deletevalue)
        *   [Parameters](#parameters-19)
    *   [values](#values)
        *   [Parameters](#parameters-20)
    *   [readStream](#readstream)
        *   [Parameters](#parameters-21)
    *   [meters](#meters)
        *   [Parameters](#parameters-22)
    *   [notes](#notes)
        *   [Parameters](#parameters-23)
    *   [entries](#entries-1)
        *   [Parameters](#parameters-24)
*   [MASTER](#master)
*   [SCHEMA_VERSION\_1](#schema_version\_1)
*   [SCHEMA_VERSION\_2](#schema_version\_2)
*   [SCHEMA_VERSION_CURRENT](#schema_version_current)
*   [CATEGORY_PREFIX](#category_prefix)
*   [VALUE_PREFIX](#value_prefix)
*   [unit](#unit)
*   [fractionalDigits](#fractionaldigits)
*   [Master](#master-1)
    *   [Properties](#properties-3)
    *   [close](#close)
    *   [categories](#categories)
        *   [Parameters](#parameters-25)
    *   [backup](#backup)
        *   [Parameters](#parameters-26)
    *   [restore](#restore)
        *   [Parameters](#parameters-27)
    *   [initialize](#initialize)
        *   [Parameters](#parameters-28)
*   [Meter](#meter)
    *   [Parameters](#parameters-29)
    *   [Properties](#properties-4)
*   [Note](#note)
    *   [Parameters](#parameters-30)
*   [secondsAsString](#secondsasstring)
    *   [Parameters](#parameters-31)

## Attribute

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

*   `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `writable` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
*   `private` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** should the value be shown
*   `depends` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** name of an attribute we depend on
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `default` **any?** the default value
*   `set` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)?** set the value
*   `get` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)?** get the value can be used to calculate default values
*   `env` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)?** environment variable use to provide the value

## definePropertiesFromOptions

*   **See**: Object.definedProperties()
*   **See**: Object.getOwnPropertyDescriptor()

Create properties from options and default options.
Already present properties (direct) are skipped.
The attribute list from the class will be applied to the
options and merged with the given set of properties.

```js
class aClass {
  static get attributes() {
    return { with_default: { default: 77 }};
  }
}

definePropertiesFromOptions(new aClass());
// equivalent to
Object.definedProperties(new aClass(),{ with_default: { value: 77 }})
```

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** target object
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** as passed to object constructor (optional, default `{}`)
*   `properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object properties (optional, default `{}`)
*   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `object.constructor.attributes||[]`)

## defaultValues

Get default values.

### Parameters

*   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
*   `object`  

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** filled with default values

## setAttribute

Set Object attribute.
The name may be a property path like 'a.b.c'.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `value` **any** 

## getAttribute

Deliver attribute value.
The name may be a property path like 'a.b.c'.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **any** value associated with the given property name

## optionJSON

Create json based on present options.
In other words only produce key value pairs if value is defined.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
*   `initial` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
*   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** to operator on (optional, default `object.constructor.attributes`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** initial + defined values

## mapAttributes

Rename attributes.
Filters out null, undefined and empty strings.

```js
mapAttributes({a:1},{a:"a'"}) // {"a'": 1}
```

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
*   `mapping` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys renamed after mapping

## mapAttributesInverse

Same as mapAttributes but with the inverse mapping.
Filters out null, undefined and empty strings

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
*   `mapping` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys renamed after mapping

## Base

Base

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
*   `owner`  
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### write

*   **See**: {key}

Writes object into database.
Leaves all other entries alone.

#### Parameters

*   `db` **levelup** 

### readDetails

Get detail objects.

#### Parameters

*   `factory` **Class** 
*   `db` **levelup** 
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from name
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to name
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator\<factory>** 

### delete

Delete record from database.

#### Parameters

*   `db` **levelup** 

### keyPrefix

Prefix of the key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### keyPrefixWith

#### Parameters

*   `object` **[Base](#base)** 

Returns **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** prefix for a given (master) object

### typeName

Name of the type in text dump

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### attributes

Additional attributes to be persisted

### entries

Get instances without owner.

#### Parameters

*   `db` **levelup** 
*   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)

Returns **AsyncIterator<[Base](#base)>** 

### entriesWith

Get instances with owner.

#### Parameters

*   `db` **levelup** 
*   `object`  
*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)
*   `owner` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **AsyncIterator<[Base](#base)>** 

### entry

Get a single instance.

#### Parameters

*   `db` **levelup** 
*   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Base](#base)** 

## description

Description of the content.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## Category

**Extends Base**

Value Category.

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    *   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
*   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### valueKey

Key for a given value.

#### Parameters

*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** key

### writeValue

Write a time/value pair.

#### Parameters

*   `db` **levelup** 
*   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### getValue

#### Parameters

*   `db` **levelup** 
*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### deleteValue

#### Parameters

*   `db` **levelup** 
*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### values

Get values of the category.

#### Parameters

*   `db` **levelup** 
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### readStream

Get values of the category as ascii text stream with time and value on each line.

#### Parameters

*   `db` **levelup** 
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Readable** 

### meters

Get Meters of the category.

#### Parameters

*   `db` **levelup** 
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from name
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to name
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator<[Meter](#meter)>** 

### notes

Get Notes of the category.

#### Parameters

*   `db` **levelup** 
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to time
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator<[Meter](#meter)>** 

### entries

Get categories.

#### Parameters

*   `db` **levelup** 
*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name

Returns **AsyncIterator<[Category](#category)>** 

## MASTER

Prefix of the master record

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## SCHEMA_VERSION\_1

Outdated schema version

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## SCHEMA_VERSION\_2

Schema with type + name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## SCHEMA_VERSION_CURRENT

Schema version for newly created databases

## CATEGORY_PREFIX

Prefix of the categories.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## VALUE_PREFIX

Prefix of the values.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## unit

Physical unit.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## fractionalDigits

Precission

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

## Master

**Extends Base**

Master record.
Holds schema version.

### Properties

*   `schemaVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### close

Close the underlaying database.

### categories

List Categories.

#### Parameters

*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### backup

Copy all data into out stream as long time text data.

#### Parameters

*   `out` **Writeable** 

### restore

Restore database from input stream.

#### Parameters

*   `input` **Readable** data from backup

### initialize

Initialize database.
checks/writes master record.

#### Parameters

*   `db` **levelup** 

Returns **[Master](#master)** 

## Meter

**Extends Base**

Meter

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
*   `category` **[Category](#category)** 
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    *   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
*   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

## Note

**Extends Base**

Hints placed on a category at a specific time.

### Parameters

*   `time`  
*   `owner`  
*   `options`  

## secondsAsString

Format seconds as string left padded with '0'.

### Parameters

*   `seconds` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** padded seconds
