export const usePackageManager = () => {
  const packageManagers = [
    {
      label: 'pip',
      icon: 'i-custom-python',
      command: 'pip install',
      templateCommand: 'pip install litestar && litestar',
    },
    {
      label: 'uv',
      icon: 'i-custom-uv',
      command: 'uv add',
      templateCommand: 'uvx litestar@latest',
    },
  ]

  const selectedPackageManager = useState(
    'packageManager',
    () => packageManagers[1]!,
  ) // default to uv

  return {
    packageManagers,
    selectedPackageManager,
  }
}
