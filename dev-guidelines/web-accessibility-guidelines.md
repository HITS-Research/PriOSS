Web Accessibility Guidelines that we can follow:-
- Think about universal design principles so that the application can be used by widest spectrum of users.
- Maintain a consistent and simple page layout.
- Making sure that the text pixel should be more than 10.
```Test
font-size: 11px;
```

- Use resizable fonts. So that user with poor eyesight can also use our application. The text size can be set with a VW unit.
```Test
<h1 style="font-size:11vw">PET</h1>
```
- The color contrast ratio should be more than 4.5:1.
```Test
- Good website for checking color contrast : https://webaim.org/resources/contrastchecker/
- The color contrast ratio for the below specification is 5.6:1
- Foreground color – Gray #6B6763
- Background color – White #FFFFFF
```
- Any message should not be conveyed with color. The proper text should be given.
- While developing any application make sure that it is accessible by keyboard with tab functionality.
```Test
Elements should be focusable and interactive. One of the ways of doing it is by adding “tabindex=0”.
```
- Every non–text content, Image, Button etc. should have descriptive text so that if a differently enable user goes to use a screen reader, he can understand the application.
```Test
Image: empty alternative text should be given such as (alt=“”)
<img src="PET.png" alt="Privacy Enhancing Tool”>
```
- Ensure that all headings contain informative content. Differently enable users, especially keyboard and screen reader users, often navigate by heading elements. An empty heading will present no information and may introduce confusion.
- We can give ARIA labels or HTML-accessible names. The important thing to remember he accessible name provided with the native HTML will be overridden by the accessible name provided with ARIA. Like native HTML accessible names, ARIA labels define accessible names to be read by screen readers for interface elements.
```Test
<button aria-label="Upload your data download">Upload</button>
```
- ARIA labels should be present. ARIA labels define accessible names to be read by screen readers for interface elements.
- Provide a skip navigation link at the top of each page. So that when the user will try to access this page from the screen reader he doesn’t have to traverse the whole part. He can skip it.
```Test
<body> <--
<a href="#mainContent">Skip to main content</a><--
...<--
<main id="mainContent"><--
<h1>Heading</h1><--
<p>First paragarph</p>
```
