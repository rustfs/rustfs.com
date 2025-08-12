#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 扫描根目录下的 locales 文件夹中的所有 JSON 语言包文件
function scanLanguagePacks() {
  const localesDir = path.join(__dirname, '../locales')

  if (!fs.existsSync(localesDir)) {
    throw new Error(`目录不存在: ${localesDir}`)
  }

  const files = fs.readdirSync(localesDir)

  // 过滤出 JSON 语言包文件
  const languageFiles = files.filter(file =>
    file.endsWith('.json')
  )

  return languageFiles.map(file => {
    const locale = file.replace('.json', '')
    const filePath = path.join(localesDir, file)

    // 验证 JSON 文件格式
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const messages = JSON.parse(content)

      // 检查是否包含必要的命名空间
      const namespaces = Object.keys(messages).filter(key =>
        typeof messages[key] === 'object' && messages[key] !== null
      )

      return {
        file,
        locale,
        filePath,
        namespaces,
        messageCount: Object.keys(messages).length
      }
    } catch (error) {
      console.warn(`⚠️  警告: ${file} JSON 格式错误: ${error.message}`)
      return { file, locale, filePath, namespaces: [], messageCount: 0 }
    }
  })
}

// 生成语言包信息报告
function generateReport(languagePacks) {
  if (languagePacks.length === 0) {
    throw new Error('没有找到任何语言包文件')
  }

  console.log('📊 语言包分析报告')
  console.log('=' * 50)

  languagePacks.forEach(pack => {
    console.log(`\n🌍 ${pack.locale.toUpperCase()} 语言包:`)
    console.log(`   📁 文件: ${pack.file}`)
    console.log(`   📊 总键数: ${pack.messageCount}`)
    console.log(`   🏷️  命名空间: ${pack.namespaces.join(', ')}`)

    // 显示每个命名空间的键数
    if (pack.namespaces.length > 0) {
      try {
        const content = fs.readFileSync(pack.filePath, 'utf8')
        const messages = JSON.parse(content)

        pack.namespaces.forEach(namespace => {
          const namespaceKeys = Object.keys(messages[namespace] || {})
          console.log(`      ${namespace}: ${namespaceKeys.length} 个键`)
        })
      } catch (error) {
        console.log(`      ❌ 无法读取文件内容`)
      }
    }
  })

  // 检查命名空间一致性
  const allNamespaces = new Set()
  languagePacks.forEach(pack => {
    pack.namespaces.forEach(ns => allNamespaces.add(ns))
  })

  console.log('\n🔍 命名空间一致性检查:')
  languagePacks.forEach(pack => {
    const missing = Array.from(allNamespaces).filter(ns => !pack.namespaces.includes(ns))
    if (missing.length > 0) {
      console.log(`   ⚠️  ${pack.locale}: 缺少命名空间: ${missing.join(', ')}`)
    } else {
      console.log(`   ✅ ${pack.locale}: 命名空间完整`)
    }
  })
}

// 验证语言包结构
function validateLanguagePacks(languagePacks) {
  const errors = []

  languagePacks.forEach(pack => {
    try {
      const content = fs.readFileSync(pack.filePath, 'utf8')
      const messages = JSON.parse(content)

      // 检查基本结构
      if (typeof messages !== 'object' || messages === null) {
        errors.push(`${pack.locale}: 根级别必须是对象`)
      }

      // 检查命名空间结构
      pack.namespaces.forEach(namespace => {
        if (typeof messages[namespace] !== 'object' || messages[namespace] === null) {
          errors.push(`${pack.locale}.${namespace}: 必须是对象类型`)
        }
      })

    } catch (error) {
      errors.push(`${pack.locale}: JSON 解析失败 - ${error.message}`)
    }
  })

  if (errors.length > 0) {
    console.log('\n❌ 发现以下问题:')
    errors.forEach(error => console.log(`   - ${error}`))
    return false
  }

  return true
}

// 主函数
function main() {
  try {
    console.log('🔍 扫描语言包文件...')
    const languagePacks = scanLanguagePacks()

    if (languagePacks.length === 0) {
      console.log('❌ 没有找到任何语言包文件')
      return
    }

    // 生成报告
    generateReport(languagePacks)

    // 验证结构
    console.log('\n🔍 验证语言包结构...')
    if (validateLanguagePacks(languagePacks)) {
      console.log('✅ 所有语言包结构验证通过')
    } else {
      console.log('❌ 语言包结构验证失败')
      process.exit(1)
    }

    console.log('\n🎉 语言包分析完成!')
    console.log(`📝 发现 ${languagePacks.length} 个语言包`)
    console.log(`🔄 下次添加新语言时，只需在 locales/ 目录创建新的 JSON 文件即可`)

  } catch (error) {
    console.error('❌ 分析失败:', error.message)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main()
}

module.exports = {
  scanLanguagePacks,
  generateReport,
  validateLanguagePacks
}
