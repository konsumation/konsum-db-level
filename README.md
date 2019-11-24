[![Build Status](https://secure.travis-ci.org/k0nsti/konsum-db.png)](http://travis-ci.org/k0nsti/konsum-db)
[![codecov.io](http://codecov.io/github/k0nsti/konsum-db/coverage.svg?branch=master)](http://codecov.io/github/k0nsti/konsum-db?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/k0nsti/konsum-db.svg)](https://david-dm.org/k0nsti/konsum-db)
[![devDependency Status](https://david-dm.org/k0nsti/konsum-db/dev-status.svg)](https://david-dm.org/k0nsti/konsum-db#info=devDependencies)
[![docs](http://inch-ci.org/github/k0nsti/konsum-db.svg?branch=master)](http://inch-ci.org/github/k0nsti/konsum-db)
[![downloads](http://img.shields.io/npm/dm/konsum-db.svg?style=flat-square)](https://npmjs.org/package/konsum-db)
[![GitHub Issues](https://img.shields.io/github/issues/k0nsti/konsum-db.svg?style=flat-square)](https://github.com/k0nsti/konsum-db/issues)
[![Greenkeeper](https://badges.greenkeeper.io/k0nsti/konsum-db.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/k0nsti/konsum-db/badge.svg)](https://snyk.io/test/github/k0nsti/konsum-db)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/konsum-db)](https://bundlephobia.com/result?p=konsum-db)
[![npm](https://img.shields.io/npm/v/konsum-db.svg)](https://www.npmjs.com/package/konsum-db)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/k0nsti/konsum-db)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# konsum-db

timeseries database on leveldb

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [MASTER](#master)
-   [SCHEMA_VERSION](#schema_version)
-   [initialize](#initialize)
    -   [Parameters](#parameters)
-   [backup](#backup)
    -   [Parameters](#parameters-1)
-   [restore](#restore)
    -   [Parameters](#parameters-2)
-   [CATEGORY_PREFIX](#category_prefix)
-   [VALUE_PREFIX](#value_prefix)
-   [Category](#category)
    -   [Parameters](#parameters-3)
    -   [Properties](#properties)
    -   [write](#write)
        -   [Parameters](#parameters-4)
    -   [writeValue](#writevalue)
        -   [Parameters](#parameters-5)
    -   [values](#values)
        -   [Parameters](#parameters-6)
    -   [readStream](#readstream)
        -   [Parameters](#parameters-7)
    -   [entries](#entries)
        -   [Parameters](#parameters-8)
    -   [entry](#entry)
        -   [Parameters](#parameters-9)
-   [description](#description)
-   [unit](#unit)
-   [secondsAsString](#secondsasstring)
    -   [Parameters](#parameters-10)
-   [definePropertiesFromOptions](#definepropertiesfromoptions)
    -   [Parameters](#parameters-11)
-   [optionJSON](#optionjson)
    -   [Parameters](#parameters-12)

## MASTER

prefix of the master record

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## SCHEMA_VERSION

current schema version

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## initialize

initialize database
checks/writes master record

### Parameters

-   `db` **levelup** 

## backup

Copy all data into out stream as long time text data

### Parameters

-   `database` **levelup** 
-   `master` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `out` **Writeable** 

## restore

Restore database from input stream

### Parameters

-   `database` **levelup** 
-   `input` **Readable** data from backup

## CATEGORY_PREFIX

prefix of the categories
will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## VALUE_PREFIX

prefix of the values
will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## Category

Value Catetegory

### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3

### Properties

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
-   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit

### write

write the category. Leaves all the values alone

#### Parameters

-   `db` **levelup** 

### writeValue

write a time/value pair

#### Parameters

-   `db` **levelup** 
-   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

### values

get values of the category

#### Parameters

-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Iterator&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### readStream

get values of the category as ascii text stream with time and value on each line

#### Parameters

-   `db` **levelup** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of earliest value
    -   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** time of latest value
    -   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** order

Returns **Readable** 

### entries

get categories

#### Parameters

-   `db` **levelup** 
-   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** lowest name (optional, default `"\u0000"`)
-   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** highst name (optional, default `"\uFFFF"`)

Returns **AsyncIterator&lt;[Category](#category)>** 

### entry

get a single category

#### Parameters

-   `db` **levelup** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Category](#category)** 

## description

the description of the content.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## unit

physical unit.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## secondsAsString

format seconds as string left padded with '0'

### Parameters

-   `number` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** padded seconds

## definePropertiesFromOptions

-   **See: Object.definedProperties()**

create properties from options and default options

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** target object
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** as passed to object constructor
-   `properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object properties (optional, default `{}`)

## optionJSON

create json based on present options.
In other words only produce key value pairs if value is defined.

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `initial` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** initial + defined values
