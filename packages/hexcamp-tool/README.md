# hexcamp-tool

# Installation

```
npm install -g hexcamp-tool
```

# Usage

```
hexcamp-tool <subcommand>

where <subcommand> can be one of:

- ehid-to-h3-hex
- h3-hex-to-ehid
- ehid-to-dns-unpacked
- dns-unpacked-to-ehid

For more help, try running `hexcamp-tool <subcommand> --help`
```

If we take the URL of a [Hex.Camp](https://hex.camp/) website such as [6kgvdnw3nwza.seahex.org](https://6kgvdnw3nwza.seahex.org/) - the "6kgvdnw3nwza" portion of
the host name is something we call an "Encoded Hexagon ID", or "EHID" for short.

You can enter the EHID values into the [Encoded Hexagon ID Lookup Tool](https://6l22glmvqj2a.test.hex.camp/) to find them on the world map.

These can be converted to a convention [H3 Cell ID](https://h3geo.org/) using the following:

```
$ hexcamp-tool ehid-to-h3-hex 6kgvdnw3nwza
8f28d51b6db6db2
```

You can enter the H3 Cell IDs into the map on the homepage of [h3geo.org](https://h3geo.org/) to see them on the map.

There is also an [Observable Notebook](https://observablehq.com/@nrabinowitz/h3-index-bit-layout?collection=@nrabinowitz/h3) where you can see the bit layout of the encoded hexagon location.

To convert in the other direction, you can do:

```
$ hexcamp-tool h3-hex-to-ehid 8f28d51b6db6db2
6kgvdnw3nwza
```

When a website is mapped in the DNS for a Hex.Camp community, lookups resolve to a CNAME which point at
subdomain derived from the base cell and index digits in the encoded H3 Hexagon value. For example:

```
$ dig +short CNAME 6kgvdnw3nwza.seahex.org
2.6.6.6.6.6.6.6.6.6.6.0.5.2.3.20.h3.seahex.org.
```

The tool can derive the same values:

```
$ hexcamp-tool ehid-to-dns-unpacked 6kgvdnw3nwza
2.6.6.6.6.6.6.6.6.6.6.0.5.2.3.20
```

The reverse looks like:

```
$ hexcamp-tool dns-unpacked-to-ehid 2.6.6.6.6.6.6.6.6.6.6.0.5.2.3.20
6kgvdnw3nwza
```

# License

MIT or Apache 2
