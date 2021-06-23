export default function ({ store, route, redirect }) {
  const isLoggedIn = !!store.state.auth.user
  const role = store.state.auth.user && store.state.auth.user.role.name
  if (isLoggedIn) {
    if (route.meta[0].requiresGuest) {
      return redirect('/home')
    }
    if (route.meta[0].requiresAdmin && role !== 'ADMIN') {
      return redirect('/login')
    }
  }
  if (!isLoggedIn) {
    const isNotRequired = route.meta.every((meta) => {
      return !meta.requiresAuth && !meta.requiresAdmin
    })
    if (!isNotRequired) {
      return redirect('/login')
    }
  }
}
