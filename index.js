const busy = [
  {'start' : '10:30',
    'stop' : '10:50'
  },
  {'start' : '18:40',
    'stop' : '18:50'
  },
  {'start' : '14:40',
    'stop' : '15:50'
  },
  {'start' : '16:40',
    'stop' : '17:20'
  },
  {'start' : '20:05',
    'stop' : '20:20'
  }
]

function valueOfBusy(busy) {
  const regex = /^(\d+):(\d+)$/;
  return busy.map((b) => {
    const start = new Date()
    const s = b.start.match(regex)
    start.setHours(s[1], s[2], 0, 0)

    const end = new Date()
    const e = b.stop.match(regex)
    end.setHours(e[1], e[2], 0, 0)
    return {start: start.valueOf(), end: end.valueOf()}
  })
}

function getFreeTime(busy) {
  let arr = []
  const start = new Date();
  start.setHours(9, 0, 0, 0)

  const end = new Date();
  end.setHours(21, 0, 0, 0)

  let s = start.valueOf()
  const e = end.valueOf()
  const step = 1000 * 60 * 30
  while (s < e) {
    if (e - s < step) break
    let isFree = true
    for (let b of busy) {
      if ((s <= b.start) && (b.start < (s + step))) {
        isFree = false
        s = b.end
        break
      }
    }
    if (isFree) {
      arr.push({start: s, end: s + step})
      s += step
    }


  }


  return arr.map((a) => {
    const startMsc = new Date(a.start)
    const endMsc = new Date(a.end)
    startMsc.setHours(startMsc.getHours() + 3)
    endMsc.setHours(endMsc.getHours() + 3)
    return {start: startMsc, end: endMsc}
  })
}


const newBusy = valueOfBusy(busy)
newBusy.sort((a, b) => a.start - b.start)
const freeTime = getFreeTime(newBusy)
console.log(freeTime)

