Marketing site for TailoredShapes — legacy system integration consultancy.

No build step. Static HTML, one stylesheet, one small ES module. Edit and
commit. To preview locally:

    python3 -m http.server

## Layout

    index.html                                    Home
    toolkit/index.html                            Toolkit
    case-studies/springfield-electric/index.html  Worked example
    approach/, deployment/                        retired, redirect stubs
    styles.css                                    the whole design system
    backends.js                                   data for the picker
    picker.js                                     the one interactive piece

Three real routes, not an in-page switcher. `styles.css` is the source, not a
build output — the site used to be Tailwind and no longer is, so don't
regenerate it.

## The design

Modernist, tapered warmer: warm paper rather than grey, Archivo 400 at display
size rather than 800, hairline rules rather than 2px, and red demoted from a
field to a single thread. Zero corner radius, no shadows, nothing centred,
nothing animated. That taper is the brand voice — keep it.

Every section is the same two-column band: a 264px margin column carrying a
22×1px accent mark and an uppercase label stack, then the content. Below 900px
the margin column collapses into a line above the content and the chalk grid
is dropped.

## The picker

The home page's backend picker exists to demonstrate one claim: switching
where you deploy changes the storage config and nothing else. Exactly two of
its eight visible lines change between tabs. `picker.js` therefore updates text
nodes in place rather than re-rendering — if you replace it with something that
re-renders or animates the panel, the demonstration is lost.

The markup ships with the first backend already in it, so the section is
complete and readable with JavaScript off.
