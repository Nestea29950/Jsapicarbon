import express from 'express';

import psi from 'psi';
import { WebsiteCarbonCalculator, WebsiteCarbonCalculatorError, } from 'website-carbon-calculator';

var app = express();
import cors from 'cors';

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api', function (req, res) {

  const url = req.query.url;
  const websiteCarbonCalculator = new WebsiteCarbonCalculator({ pagespeedApiKey: 'AIzaSyCXkSBXLSiY0OlTpgAp0u5OvOrCTVCgveg' });

  async function calculCarbon() {
    try {
      const carbon = await websiteCarbonCalculator.calculateByURL(url)
      const data2 = await psi(url, {
        key: 'AIzaSyCXkSBXLSiY0OlTpgAp0u5OvOrCTVCgveg',
        strategy: 'mobile'
      });
      JSON.stringify(carbon); 
      JSON.stringify(data2);
      console.log('performancescore:', data2.data.lighthouseResult.categories.performance.score);
      console.log(carbon);
      var audits = [ {"id":1,"name":"carbon","score":carbon}
      , {"id":2,"name":"performances","score":data2.data.lighthouseResult.categories.performance.score}
      , {"id":3,"name":"first-contentful-paint-3g","score":data2.data.lighthouseResult.audits['first-contentful-paint-3g'].score}
      , {"id":4,"name":"interactive","score":data2.data.lighthouseResult.audits['interactive'].score}
      , {"id":5,"name":"preload-lcp-image","score":data2.data.lighthouseResult.audits['preload-lcp-image'].score}
      , {"id":6,"name":"main-thread-tasks","score":data2.data.lighthouseResult.audits['main-thread-tasks'].score}
      , {"id":7,"name":"unused-css-rules","score":data2.data.lighthouseResult.audits['unused-css-rules'].score}
      , {"id":8,"name":"viewport","score":data2.data.lighthouseResult.audits['viewport'].score}
      , {"id":9,"name":"user-timings","score":data2.data.lighthouseResult.audits['user-timings'].score}
      , {"id":10,"name":"final-screenshot","score":data2.data.lighthouseResult.audits['final-screenshot'].score}
      , {"id":11,"name":"bootup-time","score":data2.data.lighthouseResult.audits['bootup-time'].score}
      , {"id":12,"name":"non-composited-animations","score":data2.data.lighthouseResult.audits['non-composited-animations'].score}
      , {"id":13,"name":"third-party-summary","score":data2.data.lighthouseResult.audits['third-party-summary'].score}
      , {"id":14,"name":"diagnostics","score":data2.data.lighthouseResult.audits['diagnostics'].score}
      , {"id":15,"name":"metrics","score":data2.data.lighthouseResult.audits['metrics'].score}
      , {"id":16,"name":"no-document-write","score":data2.data.lighthouseResult.audits['no-document-write'].score}
      , {"id":17,"name":"performance-budget","score":data2.data.lighthouseResult.audits['performance-budget'].score}
      , {"id":18,"name":"largest-contentful-paint","score":data2.data.lighthouseResult.audits['largest-contentful-paint'].score}
      , {"id":19,"name":'offscreen-images',"score": data2.data.lighthouseResult.audits['offscreen-images'].score}
      , {"id":20,"name":'screenshot-thumbnails',"score": data2.data.lighthouseResult.audits['screenshot-thumbnails'].score}
      , {"id":21,"name":'critical-request-chains',"score": data2.data.lighthouseResult.audits['critical-request-chains'].score}
      , {"id":22,"name":'unminified-javascript',"score": data2.data.lighthouseResult.audits['unminified-javascript'].score}
      , {"id":23,"name":'uses-responsive-images',"score": data2.data.lighthouseResult.audits['uses-responsive-images'].score}
      , {"id":24,"name":'timing-budget',"score": data2.data.lighthouseResult.audits['timing-budget'].score}
      , {"id":25,"name":'unused-javascript',"score": data2.data.lighthouseResult.audits['unused-javascript'].score}
      , {"id":26,"name":'first-meaningful-paint',"score": data2.data.lighthouseResult.audits['first-meaningful-paint'].score}
      , {"id":27,"name":'lcp-lazy-loaded',"score": data2.data.lighthouseResult.audits['lcp-lazy-loaded'].score}
      , {"id":28,"name":'network-requests',"score": data2.data.lighthouseResult.audits['network-requests'].score} 
      , {"id":29,"name":'uses-long-cache-ttl',"score": data2.data.lighthouseResult.audits['uses-long-cache-ttl'].score}
      , {"id":30,"name":'layout-shift-elements',"score": data2.data.lighthouseResult.audits['layout-shift-elements'].score}
      , {"id":31,"name":'redirects',"score": data2.data.lighthouseResult.audits['redirects'].score}
      , {"id":32,"name":'resource-summary',"score": data2.data.lighthouseResult.audits['resource-summary'].score}
      , {"id":33,"name":'network-rtt',"score": data2.data.lighthouseResult.audits['network-rtt'].score}
      , {"id":34,"name":'unminified-css',"score": data2.data.lighthouseResult.audits['unminified-css'].score}
      , {"id":35,"name":'efficient-animated-content',"score": data2.data.lighthouseResult.audits['efficient-animated-content'].score}
      , {"id":36,"name":'uses-passive-event-listeners',"score": data2.data.lighthouseResult.audits['uses-passive-event-listeners'].score}
      , {"id":37,"name":'cumulative-layout-shift',"score": data2.data.lighthouseResult.audits['cumulative-layout-shift'].score}
      , {"id":38,"name":'server-response-time',"score": data2.data.lighthouseResult.audits['server-response-time'].score}
      , {"id":39,"name":'mainthread-work-breakdown',"score": data2.data.lighthouseResult.audits['mainthread-work-breakdown'].score}
      , {"id":40,"name":'largest-contentful-paint-element',"score": data2.data.lighthouseResult.audits['largest-contentful-paint-element'].score}
      , {"id":41,"name":'font-display',"score": data2.data.lighthouseResult.audits['font-display'].score}
      , {"id":42,"name":'total-blocking-time',"score": data2.data.lighthouseResult.audits['total-blocking-time'].score}
      , {"id":43,"name":'full-page-screenshot',"score": data2.data.lighthouseResult.audits['full-page-screenshot'].score}
      , {"id":44,"name":'total-byte-weight',"score": data2.data.lighthouseResult.audits['total-byte-weight'].score}
      , {"id":45,"name":'long-tasks',"score": data2.data.lighthouseResult.audits['long-tasks'].score}
      , {"id":46,"name":'network-server-latency',"score": data2.data.lighthouseResult.audits['network-server-latency'].score}
      , {"id":47,"name":'third-party-facades',"score": data2.data.lighthouseResult.audits['third-party-facades'].score}
      , {"id":48,"name":'max-potential-fid',"score": data2.data.lighthouseResult.audits['max-potential-fid'].score}
      , {"id":49,"name":'speed-index',"score": data2.data.lighthouseResult.audits['speed-index'].score}
      , {"id":50,"name":'no-unload-listeners',"score": data2.data.lighthouseResult.audits['no-unload-listeners'].score}
      , {"id":51,"name":'uses-text-compression',"score": data2.data.lighthouseResult.audits['uses-text-compression'].score}
      , {"id":52,"name":'unsized-images',"score": data2.data.lighthouseResult.audits['unsized-images'].score}
      , {"id":53,"name":'duplicated-javascript',"score": data2.data.lighthouseResult.audits['duplicated-javascript'].score}
      , {"id":54,"name":'dom-size',"score": data2.data.lighthouseResult.audits['dom-size'].score}
      , {"id":55,"name":'uses-optimized-images',"score": data2.data.lighthouseResult.audits['uses-optimized-images'].score}
      , {"id":56,"name":"performances","score":data2.data.lighthouseResult.categories.performance.score}
      , {"id":57,"name":'render-blocking-resources',"score": data2.data.lighthouseResult.audits['render-blocking-resources'].score}
      , {"id":58,"name":'modern-image-formats',"score": data2.data.lighthouseResult.audits['modern-image-formats'].score}
      , {"id":59,"name":'uses-rel-preload',"score": data2.data.lighthouseResult.audits['uses-rel-preload'].score}
      , {"id":60,"name":'legacy-javascript',"score": data2.data.lighthouseResult.audits['legacy-javascript'].score}
      , {"id":61,"name":'first-contentful-paint',"score": data2.data.lighthouseResult.audits['first-contentful-paint'].score}];
  
      res.send({
        audits,
      });
    }
    catch (error) {

      res.send({
        'Erreur': "Url non valide",
      });
    }

  }
  calculCarbon();

});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Exemple app is listening on port http://localhost:${port}oui");
});