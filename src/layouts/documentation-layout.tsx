import { documentationNav } from '@/navs/documentation'
import { Title } from '@components/meta'
import { SidebarLayout } from './sidebar-layout'

export function DocumentationLayout(props) {
  return (
    <>
      <Title>{props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}</Title>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav
