const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: '模板名:',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '模板名不能为空!'
      } else if (!tplList[val]) {
        return '未找到该模板！'
      }
    }
  },
  {
    type: 'input',
    name: 'project',
    message: '项目名:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return '项目名不能为空!'
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '设置初始化项目位置：',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, project, place }) => {
  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  const spinner = ora('项目初始化中...')

  spinner.start()

  download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('模板初始化成功！'))
  })
})
