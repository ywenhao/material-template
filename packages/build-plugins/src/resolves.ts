type Awaitable<T> = T | PromiseLike<T>

export interface ComponentResolverObject {
  type: 'component' | 'directive'
  resolve: ComponentResolverFunction
}

export type ComponentResolveResult = Awaitable<string | ComponentInfo | null | undefined | void>
export type ComponentResolverFunction = (name: string) => ComponentResolveResult
export type ComponentResolver = ComponentResolverFunction | ComponentResolverObject

export interface ImportInfo {
  as?: string
  name?: string
  from: string
}

export type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined

export interface ComponentInfo extends ImportInfo {
  sideEffects?: SideEffectsInfo
}

export interface ResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  // ssr?: boolean

  /**
   * specify material-template version to load style
   *
   * @default installed version
   */
  // version?: string

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]

  /**
   * nightly version
   */
  nightly?: boolean
}

type ResolverOptionsResolved = Required<Omit<ResolverOptions, 'exclude'>> &
  Pick<ResolverOptions, 'exclude'>

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

// /**
//  * @deprecated
//  * @param partialName
//  * @param options
//  */
// function getSideEffectsLegacy(
//   partialName: string,
//   options: ResolverOptionsResolved,
// ): SideEffectsInfo | undefined {
//   const { importStyle } = options
//   if (!importStyle) return

//   if (importStyle === 'sass') {
//     return [
//       'material-template/packages/theme-chalk/src/base.scss',
//       `material-template/packages/theme-chalk/src/${partialName}.scss`,
//     ]
//   } else if (importStyle === true || importStyle === 'css') {
//     return [
//       'material-template/lib/theme-chalk/base.css',
//       `material-template/lib/theme-chalk/el-${partialName}.css`,
//     ]
//   }
// }

function resolveComponent(
  name: string,
  options: ResolverOptionsResolved,
): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude)) return

  if (!name.match(/^El[A-Z]/)) return

  if (name.match(/^ElIcon.+/)) {
    return {
      name: name.replace(/^ElIcon/, ''),
      from: '@material-template/icons-vue',
    }
  }

  const partialName = kebabCase(name.slice(2)) // ElTableColumn -> table-column
  const { nightly } = options

  return {
    from: `material-template/lib/el-${partialName}`,
    // sideEffects: getSideEffectsLegacy(partialName, options),
  }
}

function resolveDirective(
  name: string,
  options: ResolverOptionsResolved,
): ComponentInfo | undefined {
  if (!options.directives) return

  const directives: Record<string, { importName: string; styleName: string }> = {
    Loading: { importName: 'ElLoadingDirective', styleName: 'loading' },
    Popover: { importName: 'ElPopoverDirective', styleName: 'popover' },
    InfiniteScroll: { importName: 'ElInfiniteScroll', styleName: 'infinite-scroll' },
  }

  const directive = directives[name]
  if (!directive) return

  const { nightly } = options

  // >=1.1.0-beta.1
  // if (compare(version, '1.1.0-beta.1', '>=') || nightly) {
  //   return {
  //     name: directive.importName,
  //     from: `${nightly ? '@material-template/nightly' : 'material-template'}/${ssr ? 'lib' : 'es'}`,
  //     sideEffects: getSideEffects(directive.styleName, options),
  //   }
  // }
}

const noStylesComponents: string[] = []

/**
 * Resolver for material-template
 */
export function Resolvers(options: ResolverOptions = {}): ComponentResolver[] {
  let optionsResolved: ResolverOptionsResolved

  function resolveOptions() {
    if (optionsResolved) return optionsResolved
    optionsResolved = {
      importStyle: 'css',
      directives: true,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      nightly: false,
      ...options,
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: (name: string) => {
        const options = resolveOptions()

        if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
          return resolveComponent(name, { ...options, importStyle: false })
        else return resolveComponent(name, options)
      },
    },
    // {
    //   type: 'directive',
    //   resolve: async (name: string) => {
    //     return resolveDirective(name, await resolveOptions())
    //   },
    // },
  ]
}
