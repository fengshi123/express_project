
function examStatistics (data) {
  var data = eval('(' + data + ')');
  console.log('data...:', data);
  var sum = new Array(0, 0, 0, 0);
  var score = new Array();
  var rightsum = data.data;
  var rightSum = 0;
  var userSum = parseInt(data.userSum);
  var questionLength = parseInt(data.questionLength);
  // 求出每个用户的分数
  for (var k = 0; k < userSum; k++) {
    if (rightsum[k] === undefined) {
      rightSum = 0;
    } else {
      rightSum = rightsum[k].rightSum;
    }
    var sc = rightSum / questionLength * 100;
    score.push(sc);
    if (score[k] >= 85) {
      sum[0]++;
    } else if (score[k] >= 75 && score[k] < 85) {
      sum[1]++;
    } else if (score[k] >= 60 && score[k] < 75) {
      sum[2]++;
    } else {
      sum[3]++;
    }
  }
  console.log('成绩表：', score);
  // 获取echarts 要挂载的 dom
  var dom = document.getElementById('main');
  // 初始化 echarts 实例
  var myChart = echarts.init(dom);
  window.onresize = myChart.resize;
  // 指定图表的配置项和数据(具体属性表示可以看官网介绍 或者 自己手动更改属性值，通过查看图标变化来得到)
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a}: <br/>{b}: {c}人 <br/>({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: '10',
      y: '10',
      data: ['优秀 >85%', '良好 75% - 85%', '及格 60% - 75%', '不及格 <60%']
    },
    series: [
      {
        name: '优秀率',
        type: 'pie',
        radius: ['23%', '35%'],
        avoidLabelOverlap: false,
        center: [180, 250],
        data: [
          { value: sum[0], name: '优秀 >85%' },
          { value: sum[1], name: '良好 75% - 85%' },
          { value: sum[2], name: '及格 60% - 75%' },
          { value: sum[3], name: '不及格 <60%' }
        ],
        itemStyle: {
          normal: {
            color: function (params) {
              // 自定义颜色
              var colorList = [
                '#c23531', '#61a0a8', '#d48265', '#bda29a'
              ];
              return colorList[params.dataIndex]
            }
          }
        }
      }
    ]

  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
