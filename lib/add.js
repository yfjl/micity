const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

//提问
const question = [
  {
    type: 'input',
    name: 'name',
    message: '请设置一个模板名:',
    validate (val) {
      if (tplList[val]) {
        return '模板名已存在！'
      } else if (val === '') {
        return '模板名不能为空！'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '设置git地址,格式：用户名/项目名 ：',
    validate (val) {
      if (val !== '') {
        return true
      }
      return 'git地址不能为空！'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: '设置模板分支:',
    default: 'master'
  }
]

//写入模板并导出
module.exports = prompt(question).then(({ name, place, branch }) => {
  tplList[name] = {}
  tplList[name]['owner/name'] = place
  tplList[name]['branch'] = branch

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, '新增模板成功！')
  })
})
