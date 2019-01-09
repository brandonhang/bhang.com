#!/usr/bin/perl

use v5.10;
use strict;
use warnings;
use utf8;

my @showcase = qw(
    313
    316
    375
    362
    423
    436
    446
    498
    608
    658
    270
    248
    213
    255
    202
    172
    166
    164
    174
    109
    111
    148
    12
    22
    44
);

say "Content-Type: application/json\n";
say '[', join(',', @showcase), ']';

1;
