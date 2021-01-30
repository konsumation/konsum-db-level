[![npm](https://img.shields.io/npm/v/konsum-db.svg)](https://www.npmjs.com/package/konsum-db)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/konsum-db)](https://bundlephobia.com/result?p=konsum-db)
[![downloads](http://img.shields.io/npm/dm/konsum-db.svg?style=flat-square)](https://npmjs.org/package/konsum-db)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkonsumation%2Fkonsum-db%2Fbadge&style=flat)](https://actions-badge.atrox.dev/konsumation/konsum-db/goto)
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

-   [definePropertiesFromOptions](#definepropertiesfromoptions)
    -   [Parameters](#parameters)
-   [setAttribute](#setattribute)
    -   [Parameters](#parameters-1)
-   [getAttribute](#getattribute)
    -   [Parameters](#parameters-2)
-   [optionJSON](#optionjson)
    -   [Parameters](#parameters-3)
-   [mapAttributes](#mapattributes)
    -   [Parameters](#parameters-4)
-   [mapAttributesInverse](#mapattributesinverse)
    -   [Parameters](#parameters-5)
-   [Base](#base)
    -   [Parameters](#parameters-6)
    -   [Properties](#properties)
    -   [key](#key)
    -   [write](#write)
        -   [Parameters](#parameters-7)
    -   [readDetails](#readdetails)
        -   [Parameters](#parameters-8)
    -   [delete](#delete)
        -   [Parameters](#parameters-9)
    -   [keyPrefix](#keyprefix)
    -   [keyPrefixWith](#keyprefixwith)
        -   [Parameters](#parameters-10)
    -   [typeName](#typename)
    -   [attributes](#attributes)
    -   [entries](#entries)
        -   [Parameters](#parameters-11)
    -   [entriesWith](#entrieswith)
        -   [Parameters](#parameters-12)
    -   [entry](#entry)
        -   [Parameters](#parameters-13)
-   [description](#description)
-   [Category](#category)
    -   [Parameters](#parameters-14)
    -   [Properties](#properties-1)
    -   [valueKey](#valuekey)
        -   [Parameters](#parameters-15)
    -   [writeValue](#writevalue)
        -   [Parameters](#parameters-16)
    -   [getValue](#getvalue)
        -   [Parameters](#parameters-17)
    -   [deleteValue](#deletevalue)
        -   [Parameters](#parameters-18)
    -   [values](#values)
        -   [Parameters](#parameters-19)
    -   [readStream](#readstream)
        -   [Parameters](#parameters-20)
    -   [meters](#meters)
        -   [Parameters](#parameters-21)
    -   [notes](#notes)
        -   [Parameters](#parameters-22)
    -   [entries](#entries-1)
        -   [Parameters](#parameters-23)
-   [MASTER](#master)
-   [SCHEMA_VERSION_1](#schema_version_1)
-   [SCHEMA_VERSION_2](#schema_version_2)
-   [CATEGORY_PREFIX](#category_prefix)
-   [VALUE_PREFIX](#value_prefix)
-   [unit](#unit)
-   [fractionalDigits](#fractionaldigits)
-   [Master](#master-1)
    -   [Properties](#properties-2)
    -   [close](#close)
    -   [categories](#categories)
        -   [Parameters](#parameters-24)
    -   [backup](#backup)
        -   [Parameters](#parameters-25)
    -   [restore](#restore)
        -   [Parameters](#parameters-26)
    -   [initialize](#initialize)
        -   [Parameters](#parameters-27)
-   [Meter](#meter)
    -   [Parameters](#parameters-28)
    -   [Properties](#properties-3)
-   [Note](#note)
    -   [Parameters](#parameters-29)
-   [secondsAsString](#secondsasstring)
    -   [Parameters](#parameters-30)

## definePropertiesFromOptions

-   **See: Object.definedProperties()
    **
-   **See: Object.getOwnPropertyDescriptor()
    **

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

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** target object
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** as passed to object constructor (optional, default `{}`)
-   `properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object properties (optional, default `{}`)

## setAttribute

Set Object attribute.
The name may be a property path like 'a.b.c'.

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `value` **any** 

## getAttribute

Deliver attribute value.
The name may be a property path like 'a.b.c'.

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **any** value associated with the given property name

## optionJSON

Create json based on present options.
In other words only produce key value pairs if value is defined.

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `initial` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
-   `skip` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** keys not to put in the result (optional, default `[]`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** initial + defined values

## mapAttributes

Rename attributes.
Filters out null, undefined and empty strings.

```js
mapAttributes({a:1},{a:"a'"}) // {"a'": 1}
```

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `mapping` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys renamed after mapping

## mapAttributesInverse

Same as mapAttributes but with the inverse mapping.
Filters out null, undefined and empty strings

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `mapping` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys renamed after mapping

## Base

Base

### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
-   `owner`  
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3

### Properties

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
-   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### write

-   **See: {key}
    **

Writes object into database.
Leaves all other entries alone.

#### Parameters

-   `db` **levelup** 

### readDetails

Get detail objects.

#### Parameters

-   `factory` **Class** 
-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from name
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to name
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator&lt;factory>** 

### delete

Delete record from database.

#### Parameters

-   `db` **levelup** 

### keyPrefix

Prefix of the key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### keyPrefixWith

#### Parameters

-   `object` **[Base](#base)** 

Returns **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** prefix for a given (master) object

### typeName

Name of the type in text dump

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### attributes

Additional attributes to be persisted

### entries

Get instances without owner.

#### Parameters

-   `db` **levelup** 
-   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
-   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)

Returns **AsyncIterator&lt;[Base](#base)>** 

### entriesWith

Get instances with owner.

#### Parameters

-   `db` **levelup** 
-   `object`  
-   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
-   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)
-   `owner` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **AsyncIterator&lt;[Base](#base)>** 

### entry

Get a single instance.

#### Parameters

-   `db` **levelup** 
-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Base](#base)** 

## description

Description of the content.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## Category

**Extends Base**

Value Category.

### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    -   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
-   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
-   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### valueKey

Key for a given value.

#### Parameters

-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** key

### writeValue

Write a time/value pair.

#### Parameters

-   `db` **levelup** 
-   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### getValue

#### Parameters

-   `db` **levelup** 
-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### deleteValue

#### Parameters

-   `db` **levelup** 
-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### values

Get values of the category.

#### Parameters

-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### readStream

Get values of the category as ascii text stream with time and value on each line.

#### Parameters

-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Readable** 

### meters

Get Meters of the category.

#### Parameters

-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from name
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to name
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator&lt;[Meter](#meter)>** 

### notes

Get Notes of the category.

#### Parameters

-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to time
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator&lt;[Meter](#meter)>** 

### entries

Get categories.

#### Parameters

-   `db` **levelup** 
-   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name
-   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name

Returns **AsyncIterator&lt;[Category](#category)>** 

## MASTER

Prefix of the master record

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## SCHEMA_VERSION_1

Current schema version

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## SCHEMA_VERSION_2

future schema with type + name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

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

Master record
holds schema version.

### Properties

-   `schemaVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### close

Close the underlaying database.

### categories

List Categories

#### Parameters

-   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### backup

Copy all data into out stream as long time text data.

#### Parameters

-   `out` **Writeable** 

### restore

Restore database from input stream.

#### Parameters

-   `input` **Readable** data from backup

### initialize

Initialize database.
checks/writes master record.

#### Parameters

-   `db` **levelup** 

Returns **[Master](#master)** 

## Meter

**Extends Base**

Meter

### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
-   `category` **[Category](#category)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    -   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
-   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
-   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

## Note

**Extends Base**

Hints placed on a category at a specific time.

### Parameters

-   `time`  
-   `owner`  
-   `options`  

## secondsAsString

Format seconds as string left padded with '0'.

### Parameters

-   `number` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** padded seconds
