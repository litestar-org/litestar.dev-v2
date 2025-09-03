import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const TitleIconFeature = z.object({
  title: z.string(),
  icon: z.string()
})

const Image = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional()
})

const DualModeImage = z.object({
  light: z.string().editor({ input: 'media' }),
  dark: z.string().editor({ input: 'media' }),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional()
})

const Link = z.object({
  label: z.string(),
  to: z.string(),
  icon: z.string().optional()
})

const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  trailingIcon: z.string().optional(),
  leadingIcon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  id: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const BaseSection = z.object({
  title: z.string(),
  description: z.string()
})

const Author = z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  bluesky: z.string().optional(),
  to: z.string().optional(),
  avatar: Image.optional()
})

const PageFeature = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().editor({ input: 'icon' }),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  soon: z.boolean().optional()
})

const PageSection = BaseSection.extend({
  links: z.array(Button),
  features: z.array(PageFeature),
  image: DualModeImage,
  cta: z.object({
    title: z.string(),
    label: z.string(),
    to: z.string(),
    icon: z.string()
  }).optional()
})

const PageHero = BaseSection.extend({
  image: DualModeImage.optional(),
  head: z.object({
    title: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  headline: z.object({
    label: z.string(),
    to: z.string(),
    icon: z.string().optional().editor({ input: 'icon' })
  }).optional(),
  links: z.array(Button).optional(),
  cta: Link.optional()
})

const Template = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  thumbnail: DualModeImage,
  images: z.array(Image).optional(),
  features: z.array(TitleIconFeature).optional(),
  links: z.array(Button).optional()
})

const ShowcaseItem = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
  hostname: z.string().optional(),
  screenshotUrl: z.string().optional(),
  screenshotOptions: z.object({
    delay: z.number()
  }).optional()
})

const Starter = z.object({
  title: z.string(),
  description: z.string(),
  template: z.string(),
  icon: z.string().editor({ input: 'icon' }),
  github: z.string(),
  featured: z.boolean().optional()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'data',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          title: z.string(),
          description: z.string(),
          cta: Link.extend({
            icon: z.string()
          }),
          tabs: z.array(z.object({
            title: z.string(),
            icon: z.string(),
            content: z.string()
          }))
        }),
        logos: z.object({
          title: z.string(),
          companies: z.array(DualModeImage)
        }),
        features: PageSection,
        scale: PageSection.extend({
          code: z.string()
        }),
        templates: PageSection,
        modules: PageSection,
        deploy: PageSection,
        stats: PageSection.extend({
          community: BaseSection,
          x: z.number(),
          discord: z.string(),
          cta: Button
        }),
      })
    }),
    templatePage: defineCollection({
      type: 'data',
      source: 'template.yml',
      schema: z.object({
        hero: PageHero,
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*',
      schema: z.object({
        image: z.string().editor({ input: 'media' }),
        authors: z.array(Author),
        date: z.string().date(),
        draft: z.boolean().optional(),
        category: z.enum(['Release', 'Tutorial', 'Announcement', 'Article']),
        tags: z.array(z.string())
      })
    }),
    landing: defineCollection({
      type: 'page',
      source: [
        { include: 'index.md' },
        { include: 'blog.yml' },
        { include: 'modules.yml' },
        { include: 'deploy.yml' },
        { include: 'template.yml' },
        { include: 'video-courses.yml' },
        { include: 'enterprise/sponsors.yml' },
        { include: 'enterprise/agencies.yml' },
        { include: 'newsletter.yml' },
        { include: 'enterprise/jobs.yml' }
      ],
      schema: PageHero
    }),
    deploy: defineCollection({
      type: 'page',
      source: 'deploy/*',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        componentImg: z.string(),
        logoSrc: z.string(),
        featured: z.boolean(),
        logoIcon: z.string(),
        category: z.string(),
        nitroPreset: z.string(),
        website: z.string().url()
      })
    }),
    templates: defineCollection({
      type: 'data',
      source: 'templates/*',
      schema: Template
    }),
    starters: defineCollection({
      type: 'data',
      source: 'starters/*',
      schema: Starter
    }),
    showcase: defineCollection({
      type: 'data',
      source: 'showcase.yml',
      schema: BaseSection.extend({
        head: z.object({
          title: z.string().optional(),
          description: z.string().optional()
        }).optional(),
        websites: z.array(ShowcaseItem)
      })
    }),
    team: defineCollection({
      type: 'page',
      source: 'team.yml',
      schema: PageHero.extend({
        users: z.array(z.object({
          name: z.string(),
          location: z.string(),
          sponsor: z.string().url(),
          avatar: Image,
          links: z.array(Link)
        }))
      })
    })
  }
})