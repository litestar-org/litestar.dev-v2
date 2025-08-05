<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The Modern
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                Python
              </span>
              Web Framework
            </h1>
            <p class="text-xl text-gray-600 mt-6 leading-relaxed">
              Build blazing fast APIs with automatic documentation, dependency injection, 
              and type safety. Litestar makes complex web development simple.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mt-8">
              <UButton
                to="/docs/getting-started"
                color="primary"
                size="lg"
                class="justify-center font-semibold"
              >
                Get Started
                <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2" />
              </UButton>
              <UButton
                to="https://github.com/litestar-org/litestar"
                target="_blank"
                variant="outline"
                size="lg"
                class="justify-center font-semibold"
              >
                <UIcon name="i-simple-icons-github" class="mr-2" />
                View on GitHub
              </UButton>
            </div>
          </div>
          
          <div class="relative">
            <div class="bg-gray-900 rounded-xl p-6 shadow-2xl">
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>from litestar import Litestar, get

@get("/")
async def hello() -> dict[str, str]:
    return {"message": "Hello, World!"}

app = Litestar(route_handlers=[hello])

# Run with: litestar run</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to build modern APIs
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Litestar provides all the tools you need out of the box, with minimal configuration required.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p class="text-gray-600">
              Built on Starlette and Pydantic for exceptional performance and type safety.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Auto Documentation</h3>
            <p class="text-gray-600">
              Interactive OpenAPI documentation generated automatically from your code.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Type Safe</h3>
            <p class="text-gray-600">
              Full TypeScript-like type safety with runtime validation and serialization.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-puzzle-piece" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Dependency Injection</h3>
            <p class="text-gray-600">
              Powerful DI system that makes testing and code organization effortless.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Flexible</h3>
            <p class="text-gray-600">
              Modular architecture that adapts to your needs, from simple APIs to complex applications.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-users" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
            <p class="text-gray-600">
              Built by developers, for developers, with an active and welcoming community.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            See it in action
          </h2>
          <p class="text-xl text-gray-600">
            Build powerful APIs with minimal code
          </p>
        </div>
        
        <div class="bg-gray-900 rounded-xl p-8 shadow-2xl max-w-4xl mx-auto">
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span class="text-gray-400 text-sm ml-4">main.py</span>
          </div>
          <pre class="text-sm text-gray-300 overflow-x-auto"><code>from typing import List
from litestar import Litestar, get, post
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str

users: List[User] = []

@get("/users")
async def get_users() -> List[User]:
    return users

@post("/users")
async def create_user(data: User) -> User:
    users.append(data)
    return data

app = Litestar(
    route_handlers=[get_users, create_user],
    debug=True,
)</code></pre>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of developers building amazing APIs with Litestar
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/docs/getting-started"
            color="white"
            size="lg"
            class="justify-center font-semibold"
          >
            Start Building
            <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2" />
          </UButton>
          <UButton
            to="/examples"
            variant="outline"
            color="white"
            size="lg"
            class="justify-center font-semibold"
          >
            View Examples
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>