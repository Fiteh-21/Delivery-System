# State Management

## Zustand Stores

### Auth Store (`src/stores/auth.ts`)

Handles authentication state.

```tsx
import { useAuthStore } from "@/stores/auth"

// In a component
function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore()

  if (!isAuthenticated) return <LoginPrompt />

  return <div>Hello, {user?.name}</div>
}
```

#### Available State

| Property | Type | Description |
|---|---|---|
| `user` | `User \| null` | Current user object |
| `token` | `string \| null` | Auth token |
| `isLoading` | `boolean` | Loading state |
| `isAuthenticated` | `boolean` | Auth status |

#### Available Actions

| Action | Description |
|---|---|
| `login(data)` | Login with credentials |
| `register(data)` | Register new account |
| `logout()` | Logout and clear token |
| `getProfile()` | Fetch current user |
| `setToken(token)` | Manually set token |

### Creating New Stores

```tsx
// src/stores/deliveries.ts
import { create } from 'zustand'
import api from '@/lib/api'

interface Delivery {
  id: number
  status: string
  address: string
}

interface DeliveryState {
  deliveries: Delivery[]
  isLoading: boolean
  error: string | null
  fetchDeliveries: () => Promise<void>
  updateStatus: (id: number, status: string) => Promise<void>
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveries: [],
  isLoading: false,
  error: null,

  fetchDeliveries: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/deliveries')
      set({ deliveries: response.data.data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch deliveries', isLoading: false })
    }
  },

  updateStatus: async (id, status) => {
    try {
      await api.patch(`/deliveries/${id}`, { status })
      set((state) => ({
        deliveries: state.deliveries.map((d) =>
          d.id === id ? { ...d, status } : d
        ),
      }))
    } catch (error) {
      throw error
    }
  },
}))
```

## TanStack React Query

For server state that needs caching, refetching, and loading states.

### Setup (already configured in `App.tsx`)

```tsx
<QueryClientProvider client={queryClient}>
  {/* app */}
</QueryClientProvider>
```

### Usage

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

function DeliveryList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['deliveries'],
    queryFn: () => api.get('/deliveries').then((res) => res.data),
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading deliveries</p>

  return (
    <ul>
      {data.data.map((delivery) => (
        <li key={delivery.id}>{delivery.address}</li>
      ))}
    </ul>
  )
}
```

### Mutations

```tsx
function CreateDelivery() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newDelivery) => api.post('/deliveries', newDelivery),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
    },
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      mutation.mutate({ address: '123 Main St' })
    }}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

## When to Use What

| Use Case | Tool |
|---|---|
| User authentication | Zustand store |
| UI state (modals, sidebar) | Zustand store |
| Form state | React Hook Form |
| API data (list, detail) | React Query |
| API mutations | React Query mutation |
| Preferences/settings | Zustand + localStorage |
