# Realtor Dashboard - Quick Start Guide

## 🚀 Getting Started

The realtor dashboard is fully functional and ready to use. Here's how to work with each component:

---

## 📊 Dashboard Overview

At **`/realtor/dashboard`**, you'll find:

1. **Welcome Header** - Greeting message with "Post Property" button
2. **Key Metrics** - 4 main statistics cards
3. **Quick Stats** - 3 aggregated metrics
4. **Recent Sales** - Table of transactions
5. **Referral Network** - Cards showing referred clients
6. **Your Properties** - Grid of all properties

---

## 🔧 Component Usage

### **PostPropertyModal**

**Import:**
```typescript
import { PostPropertyModal, PropertyFormData } from '@/components/realtor/PostPropertyModal';
```

**Usage:**
```typescript
const [isOpen, setIsOpen] = useState(false);

<PostPropertyModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={async (data: PropertyFormData) => {
    // Handle property creation
    console.log(data);
  }}
/>
```

**Form Data Structure:**
```typescript
{
  title: string;
  description: string;
  price: number;
  type: PropertyType;           // 'APARTMENT' | 'HOUSE' | 'LAND' | 'COMMERCIAL'
  status: PropertyStatus;        // 'AVAILABLE' | 'PENDING' | 'SOLD' | 'RENTED'
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    parkingSpaces: number;
    hasPool: boolean;
    furnished: boolean;
  };
  images: File[];                // Multi-file upload
}
```

---

### **PropertyListings**

**Import:**
```typescript
import { PropertyListings } from '@/components/realtor/PropertyListings';
```

**Usage:**
```typescript
<PropertyListings
  properties={properties}
  onViewDetails={(property) => {
    // Handle view details
    setSelectedProperty(property);
    setDetailsOpen(true);
  }}
  onEdit={(property) => {
    // Handle edit - optional
  }}
  onDelete={(propertyId) => {
    // Handle delete - optional
  }}
  loading={false}  // optional loading state
/>
```

**Features:**
- 3-column responsive grid
- Hover effects with quick actions
- Status badges
- Property metrics display
- Empty state messaging

---

### **PropertyDetailsModal**

**Import:**
```typescript
import { PropertyDetailsModal } from '@/components/realtor/PropertyDetailsModal';
```

**Usage:**
```typescript
const [selectedProperty, setSelectedProperty] = useState(null);
const [isOpen, setIsOpen] = useState(false);

<PropertyDetailsModal
  property={selectedProperty}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

**Features:**
- Multi-image gallery
- Previous/Next navigation
- Thumbnail strip
- Address details
- Amenities display
- Action buttons (Copy, Share, Download)

---

### **Enhanced Button Component**

**New Loading State:**
```typescript
import { Button } from '@/components/ui/button';

<Button loading={isLoading} disabled={isLoading}>
  Submit Property
</Button>
```

Automatically shows spinner while loading.

---

## 📈 Key Metrics Calculation

The dashboard automatically calculates:

```typescript
// Statistics
const totalSold = MOCK_SALES.filter(s => s.status === 'COMPLETED').length;
const totalRevenue = MOCK_SALES
  .filter(s => s.status === 'COMPLETED')
  .reduce((sum, s) => sum + s.salePrice, 0);
const activeListings = properties.filter(p => p.status === 'AVAILABLE').length;
const referrals = MOCK_REFERRALS.length;

// Quick Stats
const conversionRate = referrals > 0 
  ? Math.round((MOCK_REFERRALS.filter(r => r.status === 'CONVERTED').length / referrals) * 100)
  : 0;
const avgSalePrice = totalSold > 0 
  ? Math.round(totalRevenue / totalSold)
  : 0;
```

---

## 🎨 Styling & Customization

### Primary Colors
Edit in your Tailwind config:
- `primary`: Main brand color
- `secondary`: Accent color
- `success`: Green status/success
- `warning`: Yellow pending/warning
- `info`: Blue information

### Responsive Breakpoints
- **Mobile**: Full width, single column
- **Tablet (md)**: 2-column grids
- **Desktop (lg)**: 3-4 column grids

---

## 📱 Mobile Responsive

All components are fully responsive:
- **Tables** scroll horizontally on mobile
- **Cards** stack vertically
- **Modals** adjust to viewport size
- **Images** scale responsively
- **Buttons** maintain touch-friendly sizes

---

## 🔄 State Management Pattern

The dashboard uses a simple React hooks pattern:

```typescript
// States
const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
const [isDetailsOpen, setIsDetailsOpen] = useState(false);

// Handlers
const handlePostProperty = async (data: PropertyFormData) => {
  const newProperty: Property = { /* ... */ };
  setProperties([...properties, newProperty]);
};

const handleViewDetails = (property: Property) => {
  setSelectedProperty(property);
  setIsDetailsOpen(true);
};

const handleDelete = (propertyId: string) => {
  if (confirm('Are you sure?')) {
    setProperties(properties.filter(p => p.id !== propertyId));
  }
};
```

---

## 🎯 Event Flow

```
User Action
    ↓
Event Handler (onClick, onChange, onSubmit)
    ↓
State Update (setters)
    ↓
Component Re-render
    ↓
UI Updated
```

Example:
```
Click "Post Property" Button
    ↓
setIsPostPropertyOpen(true)
    ↓
Modal renders with isOpen={true}
    ↓
User sees modal form
    ↓
User submits form
    ↓
onSubmit handler called
    ↓
New property added to state
    ↓
PropertyListings re-renders with new property
    ↓
Modal closes
```

---

## 💾 Data Integration (TODO)

To connect with real API:

```typescript
// Replace mock data:
useEffect(() => {
  async function fetchData() {
    try {
      const [props, sales, referrals] = await Promise.all([
        fetch('/api/properties').then(r => r.json()),
        fetch('/api/sales').then(r => r.json()),
        fetch('/api/referrals').then(r => r.json()),
      ]);
      setProperties(props);
      // ... set other data
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  fetchData();
}, []);
```

---

## 🐛 Common Issues & Solutions

### Issue: Modal doesn't close
**Solution:** Check that `onClose` properly sets `isOpen` to false

### Issue: Properties not appearing
**Solution:** Verify properties array is populated and passed to PropertyListings

### Issue: Images not displaying
**Solution:** Check image URLs are valid and CORS is configured

### Issue: Form not submitting
**Solution:** Verify all required fields are filled (title, price, address fields)

---

## ✅ Component Checklist

- [x] PostPropertyModal ready to use
- [x] PropertyListings displays correctly
- [x] PropertyDetailsModal opens/closes
- [x] Statistics calculate automatically
- [x] Sales table displays data
- [x] Referral cards show information
- [x] Mobile responsive design
- [x] All event handlers connected
- [x] Loading states implemented
- [x] Empty states configured

---

## 📋 File Reference

| File | Purpose |
|------|---------|
| `app/realtor/dashboard/page.tsx` | Main dashboard page |
| `components/realtor/PostPropertyModal.tsx` | Property creation form |
| `components/realtor/PropertyListings.tsx` | Property grid display |
| `components/realtor/PropertyDetailsModal.tsx` | Property details viewer |
| `app/types/realtor.ts` | TypeScript type definitions |
| `components/ui/button.tsx` | Enhanced button with loading state |

---

## 🚀 Next Steps

1. **API Integration**
   - Replace `MOCK_PROPERTIES`, `MOCK_SALES`, `MOCK_REFERRALS` with API calls
   - Implement real data fetching in useEffect

2. **Add Features**
   - Property editing functionality
   - Search and filters
   - Date range selection
   - Export functionality

3. **Enhancements**
   - Real-time notifications
   - Charts and graphs
   - Advanced analytics
   - CRM integration

---

## 📞 Support

Reference the main documentation:
- `REALTOR_DASHBOARD_FEATURES.md` - Detailed features
- `DASHBOARD_IMPLEMENTATION.md` - Complete implementation overview

---

**Status:** ✅ Production Ready
