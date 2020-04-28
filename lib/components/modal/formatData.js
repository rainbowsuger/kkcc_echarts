const formatData = (seriesData, seriesAttrs, params) => {
  let series = [], legend = []
  seriesData.map((pitem, index) => {
    legend.push(pitem[params.name])
    let tempSeries = Object.assign({}, seriesAttrs[index], {name: pitem[params.name]})
    tempSeries.data = []
    pitem[params.data]&&pitem[params.data].map(item => {
      tempSeries.data.push(item[params.value])
    })
    series.push(tempSeries)
  })
  const res = {
    series: series,
    legend: legend,
  }
  return res
}
const formatPieData = (seriesData, seriesAttrs, params) => {
  let tempSeries = seriesData.map(item => {
    return {
      name: item[params.name],
      value: item[params.value]
    }
  })
  let series = Object.assign({}, seriesAttrs, {data: tempSeries})
  return series
}

const formatScatterData = (seriesData, seriesAttrs, params) => {
  let series = [], legend = []
  seriesData.map((pitem, index) => {
    legend.push(pitem[params.name])
    let tempSeries = Object.assign({}, seriesAttrs[index], {name: pitem[params.name]})
    tempSeries.data = []
    pitem[params.data]&&pitem[params.data].map(item => {
      tempSeries.data.push([Number(item[params.x]), Number(item[params.y])])
    })
    series.push(tempSeries)
  })
  const res = {
    series: series,
    legend: legend,
  }
  return res
}

export { formatData, formatPieData, formatScatterData };
