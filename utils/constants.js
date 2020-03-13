export const NavigationBarData = {
  titleData: {
    titleName: 'CMS',
    titleLink: '/admin/dashboard'
  },
  leftMenuList: [{ menuName: 'Users', targetLink: '/admin/users' }],
  rightMenuList: [
    {
      menuIcon: 'person',
      child: [
        { menuName: 'My Account', targetLink: '/admin/my-account' },
        { menuName: 'Logout', action: 'logout' }
      ]
    }
  ]
}
