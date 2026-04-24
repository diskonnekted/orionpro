
import { getMenus, getMenuItems, getPages } from './actions';
import MenuEditor from './menu-editor';

export default async function Page() {
  const menus = await getMenus();
  const currentMenu = menus[0]; // For now just pick the first one
  const items = currentMenu ? await getMenuItems(currentMenu.id) : [];
  const pages = await getPages();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Menus</h1>
      </div>
      <MenuEditor 
        menus={menus} 
        initialItems={items} 
        pages={pages} 
        currentMenuId={currentMenu?.id}
      />
    </div>
  );
}
