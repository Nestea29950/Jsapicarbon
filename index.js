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
  // Asynchrone function permettre d'attendre l'appelle d'api 
  async function calculCarbon() {
    try {
      const carbon = await websiteCarbonCalculator.calculateByURL(url)
      const data2 = await psi(url, {
        key: 'AIzaSyCXkSBXLSiY0OlTpgAp0u5OvOrCTVCgveg',
        strategy: 'mobile'
      });

      JSON.stringify(carbon);
      console.log(carbon);
      // Créations d'une variable audits avec les éléments de la réponse api dedans !
      let audits = [];
      audits.push({ "name": "carbon", "score": carbon.co2PerPageview, "Green": carbon.isGreenHost });
      audits.push({ "name": "greenhost", "score": carbon.isGreenHost });
      audits.push({ "name": "performances", "score": data2.data.lighthouseResult.categories.performance.score });
      
      for (let i in data2.data.lighthouseResult.audits) {
        audits.push({ "name": data2.data.lighthouseResult.audits[i].id, "score": data2.data.lighthouseResult.audits[i].score, "value": data2.data.lighthouseResult.audits[i].displayValue});
      };
      let a = 0;
      while(a < data2.data.lighthouseResult.audits['resource-summary'].details.items.length){
        audits.push({"name": data2.data.lighthouseResult.audits['resource-summary'].details.items[a]["label"],"score":null,"value":data2.data.lighthouseResult.audits['resource-summary'].details.items[a]["requestCount"]})
        a++;
      }
      console.log("Résultat envoyé !");
      res.send({
        audits,
      });
    }
    // Récupere l'erreur et renvoie Url non valide !
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