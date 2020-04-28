import barOrLine from './components/barOrLine';
import pieOrFunnel from './components/pieOrFunnel';
import scatter from './components/scatter';
export default {
  install: vue => {
    vue.component(barOrLine.name, barOrLine);
    vue.component(pieOrFunnel.name, pieOrFunnel);
    vue.component(scatter.name, scatter);
  }
};
