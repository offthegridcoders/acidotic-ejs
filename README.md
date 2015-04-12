# acidotic Racing Official Website

## Part of Off The Grid Coders

You can see the progress here: [LINK](https://acidotic.herokuapp.com/)

Node.js / Express / EJS

#### Dependancies
`sudo npm install`
`gem install scss-lint`

### Running Locally
`DEBUG=acidotic:* ./bin/www`
>App should be listening on port 3000

#### Structure
+ /src
  - /assets
  - /css (built for compression - need to use gulp to auto delete this after)
  - /js
  - /scss
  - /contact
  - /event
    - (single events)
  - /events
    - (seasons)
  - /partials
    - (head,header,footer,etc...)
  - /photos
  - /results
  - /why-acidotic
+ /dist (minified and built with gulp)

#### About

>Our mission is to host uncompromisingly excellent events in beautiful locations on challenging courses and to make every competitor feel as though they are important and valuable to us.
