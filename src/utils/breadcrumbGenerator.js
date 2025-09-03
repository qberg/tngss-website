import { useLocation } from 'react-router-dom'

export const generateBreadcrumbs = (currentPath) => {
  const breadcrumbMap = {
    '/': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
    ],
    '/home': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
    ],
    '/about': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'About',
        item: 'https://tngss.startuptn.in/about',
      },
    ],
    '/why-attend': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Why Attend',
        item: 'https://tngss.startuptn.in/why-attend',
      },
    ],
    '/speakers': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Speakers',
        item: 'https://tngss.startuptn.in/speakers',
      },
    ],
    '/speakers/:slug': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Speakers',
        item: 'https://tngss.startuptn.in/speakers',
      },
      {
        position: 3,
        name: 'Speaker Profile',
        item: 'https://tngss.startuptn.in/speakers/',
      },
    ],
    '/venue': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Venue',
        item: 'https://tngss.startuptn.in/venue',
      },
    ],
    '/agenda': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Agenda',
        item: 'https://tngss.startuptn.in/agenda',
      },
    ],
    '/faq': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'FAQ',
        item: 'https://tngss.startuptn.in/faq',
      },
    ],
    '/sponsors': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Sponsors',
        item: 'https://tngss.startuptn.in/sponsors',
      },
    ],
    '/tickets': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Tickets',
        item: 'https://tngss.startuptn.in/tickets',
      },
    ],
    '/privacy-policy': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Privacy Policy',
        item: 'https://tngss.startuptn.in/privacy-policy',
      },
    ],
    '/terms-and-condition': [
      {
        position: 1,
        name: 'Home',
        item: 'https://tngss.startuptn.in/home',
      },
      {
        position: 2,
        name: 'Terms & Conditions',
        item: 'https://tngss.startuptn.in/terms-and-condition',
      },
    ],
  }

  return breadcrumbMap[currentPath] || breadcrumbMap['/home']
}

export const useBreadcrumbs = () => {
  const location = useLocation()
  const currentPath = location.pathname

  let breadcrumbKey = currentPath
  if (currentPath.startsWith('/speakers/') && currentPath !== '/speakers') {
    breadcrumbKey = '/speakers/:slug'
  }

  const breadcrumbs = generateBreadcrumbs(breadcrumbKey)

  if (breadcrumbKey === '/speakers/:slug') {
    breadcrumbs[2].item = `https://tngss.startuptn.in${currentPath}`
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  }
}
