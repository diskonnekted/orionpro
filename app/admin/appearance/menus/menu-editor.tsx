
'use client';

import { useState, useEffect } from 'react';
import { addCustomLink, addPageLink, deleteMenuItem, updateMenuItems } from './actions';

type MenuItem = {
  id: number;
  menu_id: number;
  parent_id: number;
  title: string;
  url: string;
  type: string;
  object_id: number;
  menu_order: number;
};

type Page = {
  ID: number;
  post_title: string;
  post_name: string;
};

export default function MenuEditor({ 
  menus, 
  initialItems, 
  pages, 
  currentMenuId 
}: { 
  menus: any[], 
  initialItems: MenuItem[], 
  pages: Page[], 
  currentMenuId: number 
}) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [customLink, setCustomLink] = useState({ title: '', url: 'http://' });
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleAddCustomLink = async () => {
    if (!customLink.title || !customLink.url) return;
    await addCustomLink(currentMenuId, customLink.title, customLink.url);
    setCustomLink({ title: '', url: 'http://' });
    // In a real app we'd optimistic update or wait for revalidation
    // Here we rely on server action revalidation which might refresh the page
    // but since this is a client component, we might need to router.refresh() if not automatic
  };

  const handleAddPage = async () => {
    if (!selectedPage) return;
    const page = pages.find(p => p.ID.toString() === selectedPage);
    if (page) {
      await addPageLink(currentMenuId, page.ID, page.post_title, '/' + page.post_name);
      setSelectedPage('');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await deleteMenuItem(id);
    }
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    try {
      // Prepare items for save
      // We assume the current `items` state reflects the desired order and hierarchy
      // But we need to make sure the state is updated correctly before saving
      // Actually, let's just save the current state
      const updates = items.map((item, index) => ({
        id: item.id,
        parent_id: item.parent_id,
        menu_order: index
      }));
      await updateMenuItems(updates);
      alert('Menu saved!');
    } catch (e) {
      alert('Failed to save menu');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to find children
  const getChildren = (parentId: number) => items.filter(i => i.parent_id === parentId);

  // Flatten tree for display, but calculating depth
  const renderList = () => {
    // This is tricky with flat state. 
    // Let's sort by menu_order for the "flat" view which users manipulate
    // But wait, the parent_id defines the structure.
    // If we only allow 1 level of nesting, it's easier.
    // If we allow arbitrary nesting, we need a recursive renderer.
    
    // For the editor, a flat list with indentation is easier to manage "Move Up/Down".
    // We just need to visualize the parent/child relationship.
    
    // Let's build a visual list where children are strictly after their parents?
    // No, users might drag (move) things around.
    
    // Let's use a simple approach:
    // Render root items.
    // Inside each root item, render children.
    // This makes "Move Up/Down" within siblings easy.
    // "Indent/Outdent" moves item between lists.
    
    // Recursive component?
    return (
        <ul className="space-y-2">
            {items
                .filter(i => i.parent_id === 0)
                .sort((a, b) => a.menu_order - b.menu_order)
                .map(item => (
                    <MenuItemRow key={item.id} item={item} allItems={items} depth={0} onMove={moveItem} onDelete={handleDelete} />
                ))}
        </ul>
    );
  };
  
  const moveItem = (id: number, direction: 'up' | 'down' | 'in' | 'out') => {
      const newItems = [...items];
      const index = newItems.findIndex(i => i.id === id);
      const item = newItems[index];
      
      if (direction === 'out' && item.parent_id !== 0) {
          // Move to parent's level
          const parent = newItems.find(p => p.id === item.parent_id);
          if (parent) {
             item.parent_id = parent.parent_id;
             // Append to end of new siblings? or after parent?
             // Let's put it after parent
             item.menu_order = parent.menu_order + 1; // This might conflict, but we renormalize on save
             // We need to shift others down?
             // Simplest: just change parent_id. 
          }
      } else if (direction === 'in') {
          // Make child of previous sibling
          // Find siblings (same parent)
          const siblings = newItems.filter(i => i.parent_id === item.parent_id).sort((a, b) => a.menu_order - b.menu_order);
          const siblingIndex = siblings.findIndex(s => s.id === item.id);
          if (siblingIndex > 0) {
              const prevSibling = siblings[siblingIndex - 1];
              item.parent_id = prevSibling.id;
          }
      } else if (direction === 'up' || direction === 'down') {
          // Swap menu_order with adjacent sibling
          const siblings = newItems.filter(i => i.parent_id === item.parent_id).sort((a, b) => a.menu_order - b.menu_order);
          const siblingIndex = siblings.findIndex(s => s.id === item.id);
          
          if (direction === 'up' && siblingIndex > 0) {
              const prev = siblings[siblingIndex - 1];
              const tempOrder = item.menu_order;
              item.menu_order = prev.menu_order;
              prev.menu_order = tempOrder;
          } else if (direction === 'down' && siblingIndex < siblings.length - 1) {
              const next = siblings[siblingIndex + 1];
              const tempOrder = item.menu_order;
              item.menu_order = next.menu_order;
              next.menu_order = tempOrder;
          }
      }
      
      setItems(newItems);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        {/* Add Pages */}
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <h3 className="font-semibold mb-3">Add Pages</h3>
          <div className="flex gap-2">
            <select 
              className="flex-1 border rounded px-2 py-1"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            >
              <option value="">Select a page...</option>
              {pages.map(p => (
                <option key={p.ID} value={p.ID}>{p.post_title}</option>
              ))}
            </select>
            <button onClick={handleAddPage} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded">Add</button>
          </div>
        </div>

        {/* Add Custom Link */}
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <h3 className="font-semibold mb-3">Add Custom Link</h3>
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Link Text" 
              className="w-full border rounded px-2 py-1"
              value={customLink.title}
              onChange={(e) => setCustomLink({...customLink, title: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="URL" 
              className="w-full border rounded px-2 py-1"
              value={customLink.url}
              onChange={(e) => setCustomLink({...customLink, url: e.target.value})}
            />
            <button onClick={handleAddCustomLink} className="w-full bg-slate-100 hover:bg-slate-200 py-1 rounded">Add to Menu</button>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">{menus.find(m => m.id === currentMenuId)?.name || 'Menu Structure'}</h2>
                <button 
                    onClick={handleSaveOrder} 
                    disabled={isSaving}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save Menu'}
                </button>
            </div>
            
            <div className="space-y-2">
                {renderList()}
            </div>
            
            {items.length === 0 && (
                <p className="text-slate-500 text-center py-8">No items in menu. Add some from the left.</p>
            )}
        </div>
      </div>
    </div>
  );
}

function MenuItemRow({ item, allItems, depth, onMove, onDelete }: any) {
    const children = allItems
        .filter((i: any) => i.parent_id === item.id)
        .sort((a: any, b: any) => a.menu_order - b.menu_order);

    return (
        <li className="border border-slate-200 rounded bg-slate-50 mb-2">
            <div className="flex items-center justify-between p-3">
                <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-slate-500 ml-2">({item.type})</span>
                </div>
                <div className="flex gap-1">
                    <button onClick={() => onMove(item.id, 'out')} title="Outdent" className="p-1 hover:bg-slate-200 rounded disabled:opacity-30" disabled={depth === 0}>←</button>
                    <button onClick={() => onMove(item.id, 'in')} title="Indent" className="p-1 hover:bg-slate-200 rounded disabled:opacity-30" disabled={false}>→</button>
                    <button onClick={() => onMove(item.id, 'up')} title="Move Up" className="p-1 hover:bg-slate-200 rounded">↑</button>
                    <button onClick={() => onMove(item.id, 'down')} title="Move Down" className="p-1 hover:bg-slate-200 rounded">↓</button>
                    <button onClick={() => onDelete(item.id)} title="Delete" className="p-1 text-red-600 hover:bg-red-50 rounded ml-2">×</button>
                </div>
            </div>
            {children.length > 0 && (
                <ul className="pl-6 border-l-2 border-slate-200 ml-3 mb-3 mr-3">
                    {children.map((child: any) => (
                        <MenuItemRow 
                            key={child.id} 
                            item={child} 
                            allItems={allItems} 
                            depth={depth + 1} 
                            onMove={onMove} 
                            onDelete={onDelete} 
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
