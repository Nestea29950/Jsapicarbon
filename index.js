import express from 'express';

import psi from 'psi';
import { WebsiteCarbonCalculator, WebsiteCarbonCalculatorError, } from 'website-carbon-calculator';

var app = express();
import cors from 'cors';

app.use(cors({
  origin: '*'
}));


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
      console.log('performancescore:', data2.data.lighthouseResult.audits['first-contentful-paint-3g']);

      //,"categories":"front";
      //,"categories":"back";
      //,"categories":"architecture";
      //,"categories":"time";

      var audits = [ {"id":1,"name":"carbon","score":carbon}
      , {"id":2,"name":"performances","score":data2.data.lighthouseResult.categories.performance.score}
      , {"id":3,"name":"first-contentful-paint-3g","score":data2.data.lighthouseResult.audits['first-contentful-paint-3g'].score,"description":data2.data.lighthouseResult.audits['first-contentful-paint-3g'].description,"categories":"time","value": data2.data.lighthouseResult.audits['first-contentful-paint-3g'].displayValue}
      , {"id":4,"name":"interactive","score":data2.data.lighthouseResult.audits['interactive'].score,"description":data2.data.lighthouseResult.audits['interactive'].description,"categories":"time","value": data2.data.lighthouseResult.audits['interactive'].displayValue}
      , {"id":5,"name":"preload-lcp-image","score":data2.data.lighthouseResult.audits['preload-lcp-image'].score,"description":data2.data.lighthouseResult.audits['preload-lcp-image'].description,"categories":"back"}
      , {"id":6,"name":"main-thread-tasks","score":data2.data.lighthouseResult.audits['main-thread-tasks'].score,"description":data2.data.lighthouseResult.audits['main-thread-tasks'].description}
      , {"id":7,"name":"unused-css-rules","score":data2.data.lighthouseResult.audits['unused-css-rules'].score,"description":data2.data.lighthouseResult.audits['unused-css-rules'].description,"categories":"back"}
      //, {"id":8,"name":"viewport","score":data2.data.lighthouseResult.audits['viewport'].score,"description":data2.data.lighthouseResult.audits['viewport'].description}
      //, {"id":9,"name":"user-timings","score":data2.data.lighthouseResult.audits['user-timings'].score,"description":data2.data.lighthouseResult.audits['user-timings'].description}
      //, {"id":10,"name":"final-screenshot","score":data2.data.lighthouseResult.audits['final-screenshot'].score,"description":data2.data.lighthouseResult.audits['final-screenshot'].description}
      //, {"id":11,"name":"bootup-time","score":data2.data.lighthouseResult.audits['bootup-time'].score,"description":data2.data.lighthouseResult.audits['bootup-time'].description}
      //, {"id":12,"name":"non-composited-animations","score":data2.data.lighthouseResult.audits['non-composited-animations'].score,"description":data2.data.lighthouseResult.audits['non-composited-animations'].description}
      , {"id":13,"name":"third-party-summary","score":data2.data.lighthouseResult.audits['third-party-summary'].score,"description":data2.data.lighthouseResult.audits['third-party-summary'].description,"categories":"back","value": data2.data.lighthouseResult.audits['third-party-summary'].displayValue}
      //, {"id":14,"name":"diagnostics","score":data2.data.lighthouseResult.audits['diagnostics'].score,"description":data2.data.lighthouseResult.audits['diagnostics'].description}
      //, {"id":15,"name":"metrics","score":data2.data.lighthouseResult.audits['metrics'].score,"description":data2.data.lighthouseResult.audits['metrics'].description}
      , {"id":16,"name":"no-document-write","score":data2.data.lighthouseResult.audits['no-document-write'].score,"description":data2.data.lighthouseResult.audits['no-document-write'].description,"categories":"back"}
      , {"id":17,"name":"performance-budget","score":data2.data.lighthouseResult.audits['performance-budget'].score,"description":data2.data.lighthouseResult.audits['performance-budget'].description,"categories":"back"}
      , {"id":18,"name":"largest-contentful-paint","score":data2.data.lighthouseResult.audits['largest-contentful-paint'].score,"description":data2.data.lighthouseResult.audits['largest-contentful-paint'].description,"categories":"time","value": data2.data.lighthouseResult.audits['largest-contentful-paint'].displayValue}
      , {"id":19,"name":'offscreen-images',"score": data2.data.lighthouseResult.audits['offscreen-images'].score,"description":data2.data.lighthouseResult.audits['offscreen-images'].description,"categories":"front"}
      //, {"id":20,"name":'screenshot-thumbnails',"score": data2.data.lighthouseResult.audits['screenshot-thumbnails'].score,"description":data2.data.lighthouseResult.audits['screenshot-thumbnails'].description}
      , {"id":21,"name":'critical-request-chains',"score": data2.data.lighthouseResult.audits['critical-request-chains'].score,"description":data2.data.lighthouseResult.audits['critical-request-chains'].description,"value": data2.data.lighthouseResult.audits['critical-request-chains'].displayValue}
      , {"id":22,"name":'unminified-javascript',"score": data2.data.lighthouseResult.audits['unminified-javascript'].score,"description":data2.data.lighthouseResult.audits['unminified-javascript'].description,"categories":"back","value": data2.data.lighthouseResult.audits['unminified-javascript'].displayValue}
      , {"id":23,"name":'uses-responsive-images',"score": data2.data.lighthouseResult.audits['uses-responsive-images'].score,"description":data2.data.lighthouseResult.audits['uses-responsive-images'].description,"categories":"front"}
      //, {"id":24,"name":'timing-budget',"score": data2.data.lighthouseResult.audits['timing-budget'].score,"description":data2.data.lighthouseResult.audits['timing-budget'].description}
      , {"id":25,"name":'unused-javascript',"score": data2.data.lighthouseResult.audits['unused-javascript'].score,"description":data2.data.lighthouseResult.audits['unused-javascript'].description,"categories":"back"}
      , {"id":26,"name":'first-meaningful-paint',"score": data2.data.lighthouseResult.audits['first-meaningful-paint'].score,"description":data2.data.lighthouseResult.audits['first-meaningful-paint'].description,"categories":"time","value": data2.data.lighthouseResult.audits['first-meaningful-paint'].displayValue}
      , {"id":27,"name":'lcp-lazy-loaded',"score": data2.data.lighthouseResult.audits['lcp-lazy-loaded'].score,"description":data2.data.lighthouseResult.audits['lcp-lazy-loaded'].description,"categories":"front"}
      //, {"id":28,"name":'network-requests',"score": data2.data.lighthouseResult.audits['network-requests'].score,"description":data2.data.lighthouseResult.audits['network-requests'].description} 
      , {"id":29,"name":'uses-long-cache-ttl',"score": data2.data.lighthouseResult.audits['uses-long-cache-ttl'].score,"description":data2.data.lighthouseResult.audits['uses-long-cache-ttl'].description,"categories":"back","value": data2.data.lighthouseResult.audits['uses-long-cache-ttl'].displayValue}
      , {"id":30,"name":'layout-shift-elements',"score": data2.data.lighthouseResult.audits['layout-shift-elements'].score,"description":data2.data.lighthouseResult.audits['layout-shift-elements'].description,"categories":"front"}
      //, {"id":31,"name":'redirects',"score": data2.data.lighthouseResult.audits['redirects'].score,"description":data2.data.lighthouseResult.audits['redirects'].description}
      //, {"id":32,"name":'resource-summary',"score": data2.data.lighthouseResult.audits['resource-summary'].score,"description":data2.data.lighthouseResult.audits['resource-summary'].description}
      //, {"id":33,"name":'network-rtt',"score": data2.data.lighthouseResult.audits['network-rtt'].score,"description":data2.data.lighthouseResult.audits['network-rtt'].description}
      , {"id":34,"name":'unminified-css',"score": data2.data.lighthouseResult.audits['unminified-css'].score,"description":data2.data.lighthouseResult.audits['unminified-css'].description,"categories":"back"}
      , {"id":35,"name":'efficient-animated-content',"score": data2.data.lighthouseResult.audits['efficient-animated-content'].score,"description":data2.data.lighthouseResult.audits['efficient-animated-content'].description,"categories":"front"}
      , {"id":36,"name":'uses-passive-event-listeners',"score": data2.data.lighthouseResult.audits['uses-passive-event-listeners'].score,"description":data2.data.lighthouseResult.audits['uses-passive-event-listeners'].description,"categories":"back"}
      , {"id":37,"name":'cumulative-layout-shift',"score": data2.data.lighthouseResult.audits['cumulative-layout-shift'].score,"description":data2.data.lighthouseResult.audits['cumulative-layout-shift'].description,"categories":"time","value": data2.data.lighthouseResult.audits['cumulative-layout-shift'].displayValue}
      , {"id":38,"name":'server-response-time',"score": data2.data.lighthouseResult.audits['server-response-time'].score,"description":data2.data.lighthouseResult.audits['server-response-time'].description,"categories":"back","value": data2.data.lighthouseResult.audits['server-response-time'].displayValue}
      , {"id":39,"name":'mainthread-work-breakdown',"score": data2.data.lighthouseResult.audits['mainthread-work-breakdown'].score,"description":data2.data.lighthouseResult.audits['mainthread-work-breakdown'].description,"categories":"architecture","value": data2.data.lighthouseResult.audits['mainthread-work-breakdown'].displayValue}
      //, {"id":40,"name":'largest-contentful-paint-element',"score": data2.data.lighthouseResult.audits['largest-contentful-paint-element'].score,"description":data2.data.lighthouseResult.audits['largest-contentful-paint-element'].description}
      , {"id":41,"name":'font-display',"score": data2.data.lighthouseResult.audits['font-display'].score,"description":data2.data.lighthouseResult.audits['font-display'].description,"categories":"front"}
      , {"id":42,"name":'total-blocking-time',"score": data2.data.lighthouseResult.audits['total-blocking-time'].score,"description":data2.data.lighthouseResult.audits['total-blocking-time'].description,"categories":"time","value": data2.data.lighthouseResult.audits['total-blocking-time'].displayValue}
      //, {"id":43,"name":'full-page-screenshot',"score": data2.data.lighthouseResult.audits['full-page-screenshot'].score,"description":data2.data.lighthouseResult.audits['full-page-screenshot'].description}
      , {"id":44,"name":'total-byte-weight',"score": data2.data.lighthouseResult.audits['total-byte-weight'].score,"description":data2.data.lighthouseResult.audits['total-byte-weight'].description,"categories":"architecture","value": data2.data.lighthouseResult.audits['total-byte-weight'].displayValue}
      //, {"id":45,"name":'long-tasks',"score": data2.data.lighthouseResult.audits['long-tasks'].score,"description":data2.data.lighthouseResult.audits['long-tasks'].description}
      //, {"id":46,"name":'network-server-latency',"score": data2.data.lighthouseResult.audits['network-server-latency'].score,"description":data2.data.lighthouseResult.audits['network-server-latency'].description}
      //, {"id":47,"name":'third-party-facades',"score": data2.data.lighthouseResult.audits['third-party-facades'].score,"description":data2.data.lighthouseResult.audits['third-party-facades'].description}
      , {"id":48,"name":'max-potential-fid',"score": data2.data.lighthouseResult.audits['max-potential-fid'].score,"description":data2.data.lighthouseResult.audits['max-potential-fid'].description,"categories":"front","value": data2.data.lighthouseResult.audits['max-potential-fid'].displayValue}
      , {"id":49,"name":'speed-index',"score": data2.data.lighthouseResult.audits['speed-index'].score,"description":data2.data.lighthouseResult.audits['speed-index'].description,"categories":"time","value": data2.data.lighthouseResult.audits['speed-index'].displayValue}
      , {"id":50,"name":'no-unload-listeners',"score": data2.data.lighthouseResult.audits['no-unload-listeners'].score,"description":data2.data.lighthouseResult.audits['no-unload-listeners'].description}
      , {"id":51,"name":'uses-text-compression',"score": data2.data.lighthouseResult.audits['uses-text-compression'].score,"description":data2.data.lighthouseResult.audits['uses-text-compression'].description,"categories":"back"}
      , {"id":52,"name":'unsized-images',"score": data2.data.lighthouseResult.audits['unsized-images'].score,"description":data2.data.lighthouseResult.audits['unsized-images'].description,"categories":"front"}
      , {"id":53,"name":'duplicated-javascript',"score": data2.data.lighthouseResult.audits['duplicated-javascript'].score,"description":data2.data.lighthouseResult.audits['duplicated-javascript'].description,"categories":"back"}
      , {"id":54,"name":'dom-size',"score": data2.data.lighthouseResult.audits['dom-size'].score,"description":data2.data.lighthouseResult.audits['dom-size'].description,"categories":"architecture","value": data2.data.lighthouseResult.audits['dom-size'].displayValue}
      , {"id":55,"name":'uses-optimized-images',"score": data2.data.lighthouseResult.audits['uses-optimized-images'].score,"description":data2.data.lighthouseResult.audits['uses-optimized-images'].description,"categories":"front"}
      , {"id":56,"name":'render-blocking-resources',"score": data2.data.lighthouseResult.audits['render-blocking-resources'].score,"description":data2.data.lighthouseResult.audits['render-blocking-resources'].description,"categories":"architecture","value": data2.data.lighthouseResult.audits['render-blocking-resources'].displayValue}
      , {"id":57,"name":'modern-image-formats',"score": data2.data.lighthouseResult.audits['modern-image-formats'].score,"description":data2.data.lighthouseResult.audits['modern-image-formats'].description,"categories":"front"}
      //, {"id":58,"name":'uses-rel-preload',"score": data2.data.lighthouseResult.audits['uses-rel-preload'].score,"description":data2.data.lighthouseResult.audits['uses-rel-preload'].description}
      //, {"id":59,"name":'legacy-javascript',"score": data2.data.lighthouseResult.audits['legacy-javascript'].score,"description":data2.data.lighthouseResult.audits['legacy-javascript'].description}
      , {"id":60,"name":'first-contentful-paint',"score": data2.data.lighthouseResult.audits['first-contentful-paint'].score,"description":data2.data.lighthouseResult.audits['first-contentful-paint'].description,"categories":"front","value": data2.data.lighthouseResult.audits['first-contentful-paint'].displayValue}];
  
      res.send({
        audits,
      });
    }
    catch (error) {
      console.log(error);
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