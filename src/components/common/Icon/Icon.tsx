import { HTMLAttributes } from 'react'

import { icon, IconName } from '@/assets/icons'

interface IconProps extends HTMLAttributes<HTMLImageElement> {
  iconName: IconName
  fill?: string
  width?: number
  height?: number
  onClick?: () => void
}

const Icon = ({ iconName, fill, ...props }: IconProps) => {
  const IconComponent = icon[iconName]

  return <IconComponent fill={fill} {...props} />
}

export default Icon
