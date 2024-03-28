[![npm](https://img.shields.io/npm/v/@konsumation/db-level.svg)](https://www.npmjs.com/package/@konsumation/db-level)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript\&label\&labelColor=blue\&color=555555)](https://typescriptlang.org)
[![bundlejs](https://deno.bundlejs.com/?q=@konsumation/db-level\&badge=detailed)](https://bundlejs.com/?q=@konsumation/db-level)
[![downloads](http://img.shields.io/npm/dm/@konsumation/db-level.svg?style=flat-square)](https://npmjs.org/package/@konsumation/db-level)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkonsumation%2Fkonsum-db-level%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/konsumation/konsum-db-level/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/konsumation/konsum-db-level/badge.svg)](https://snyk.io/test/github/konsumation/konsum-db-level)

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

*   [definePropertiesFromOptions](#definepropertiesfromoptions)
    *   [Parameters](#parameters)
*   [defaultValues](#defaultvalues)
    *   [Parameters](#parameters-1)
*   [optionJSON](#optionjson)
    *   [Parameters](#parameters-2)
*   [mapAttributes](#mapattributes)
    *   [Parameters](#parameters-3)
*   [mapAttributesInverse](#mapattributesinverse)
    *   [Parameters](#parameters-4)
*   [Base](#base)
    *   [Parameters](#parameters-5)
    *   [Properties](#properties)
    *   [key](#key)
    *   [write](#write)
        *   [Parameters](#parameters-6)
    *   [readDetails](#readdetails)
        *   [Parameters](#parameters-7)
    *   [delete](#delete)
        *   [Parameters](#parameters-8)
    *   [keyPrefix](#keyprefix)
    *   [keyPrefixWith](#keyprefixwith)
        *   [Parameters](#parameters-9)
    *   [typeName](#typename)
    *   [entries](#entries)
        *   [Parameters](#parameters-10)
    *   [entriesWith](#entrieswith)
        *   [Parameters](#parameters-11)
    *   [entry](#entry)
        *   [Parameters](#parameters-12)
*   [Category](#category)
    *   [Parameters](#parameters-13)
    *   [Properties](#properties-1)
    *   [valueKey](#valuekey)
        *   [Parameters](#parameters-14)
    *   [writeValue](#writevalue)
        *   [Parameters](#parameters-15)
    *   [getValue](#getvalue)
        *   [Parameters](#parameters-16)
    *   [deleteValue](#deletevalue)
        *   [Parameters](#parameters-17)
    *   [values](#values)
        *   [Parameters](#parameters-18)
    *   [readStream](#readstream)
        *   [Parameters](#parameters-19)
    *   [meters](#meters)
        *   [Parameters](#parameters-20)
    *   [notes](#notes)
        *   [Parameters](#parameters-21)
    *   [entries](#entries-1)
        *   [Parameters](#parameters-22)
*   [MASTER](#master)
*   [CATEGORY\_PREFIX](#category_prefix)
*   [VALUE\_PREFIX](#value_prefix)
*   [METER\_PREFIX](#meter_prefix)
*   [NOTE\_PREFIX](#note_prefix)
*   [LevelMaster](#levelmaster)
    *   [Properties](#properties-2)
    *   [db](#db)
    *   [close](#close)
    *   [categories](#categories)
        *   [Parameters](#parameters-23)
    *   [backup](#backup)
        *   [Parameters](#parameters-24)
    *   [restore](#restore)
        *   [Parameters](#parameters-25)
    *   [initialize](#initialize)
        *   [Parameters](#parameters-26)
*   [Meter](#meter)
    *   [Parameters](#parameters-27)
    *   [Properties](#properties-3)
*   [Note](#note)
    *   [Parameters](#parameters-28)
    *   [attributes](#attributes)
*   [secondsAsString](#secondsasstring)
    *   [Parameters](#parameters-29)

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
*   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** attribute meta info (optional, default `object.constructor.attributes`)

## defaultValues

Get default values.

### Parameters

*   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** filled with default values

## optionJSON

Create json based on present options.
In other words only produce key value pairs if value is defined.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
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

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `mapping` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys renamed after mapping

## mapAttributesInverse

Same as mapAttributes but with the inverse mapping.
Filters out null, undefined and empty strings

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `mapping` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys renamed after mapping

## Base

Base

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
*   `owner` &#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### write

*   **See**: {key}

Writes object into database.
Leaves all other entries alone.

#### Parameters

*   `db` **ClassicLevel**&#x20;

### readDetails

Get detail objects.

#### Parameters

*   `factory` &#x20;
*   `db` **ClassicLevel**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from name
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to name
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **AsyncIterable\<factory>**&#x20;

### delete

Delete record from database.

#### Parameters

*   `db` **ClassicLevel**&#x20;

### keyPrefix

Prefix of the key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### keyPrefixWith

#### Parameters

*   `object` **[Base](#base)**&#x20;

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** prefix for a given (master) object

### typeName

Name of the type in text dump

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### entries

Get instances without owner.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)

Returns **AsyncIterable<[Base](#base)>**&#x20;

### entriesWith

Get instances with owner.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)

Returns **AsyncIterable<[Base](#base)>**&#x20;

### entry

Get a single instance.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<([Base](#base) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))>**&#x20;

## Category

**Extends Base**

Value Category.

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    *   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
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

*   `db` **ClassicLevel**&#x20;
*   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**&#x20;
*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### getValue

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### deleteValue

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### values

Get values of the category.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **AsyncIterable<{value: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), time: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}>**&#x20;

### readStream

Get values of the category as ascii text stream with time and value on each line.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Readable**&#x20;

### meters

Get Meters of the category.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from name
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to name
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **AsyncIterable<[Meter](#meter)>**&#x20;

### notes

Get Notes of the category.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** up to time
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **AsyncIterable<[Meter](#meter)>**&#x20;

### entries

Get categories.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `gte` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** lowest name
*   `lte` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** highst name

Returns **AsyncIterable<[Category](#category)>**&#x20;

## MASTER

Prefix of the master record

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## CATEGORY\_PREFIX

Prefix of the categories.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## VALUE\_PREFIX

Prefix of the values.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## METER\_PREFIX

Prefix of the meters.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## NOTE\_PREFIX

Prefix of the notes.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## LevelMaster

**Extends Master**

Master record.
Holds schema version.

### Properties

*   `schemaVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### db

Type: ClassicLevel

### close

Close the underlaying database.

### categories

List Categories.

#### Parameters

*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### backup

Copy all data into out stream as long time text data.

#### Parameters

*   `out` **Writeable**&#x20;

### restore

Restore database from input stream.

#### Parameters

*   `input` **ReadableStream** data from backup

### initialize

Initialize database.
checks/writes master record.

#### Parameters

*   `directory` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<Master>**&#x20;

## Meter

**Extends Base**

Meter

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
*   `category` **[Category](#category)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    *   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
*   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

## Note

**Extends Base**

Hints placed on a category at a specific time.

### Parameters

*   `time` &#x20;
*   `owner` &#x20;
*   `options` &#x20;

### attributes

Additional attributes to be persisted

## secondsAsString

Format seconds as string left padded with '0'.

### Parameters

*   `seconds` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** padded seconds
