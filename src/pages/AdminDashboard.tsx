import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Users, Package, ShoppingCart, BarChart3, Settings, LogOut, Shield, Edit, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigate, Link } from "react-router-dom";

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  roles: string[];
}

interface PageContent {
  id: string;
  page_slug: string;
  title: string;
  content: any;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [pages, setPages] = useState<PageContent[]>([]);
  const [pagesLoading, setPagesLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [newPageContent, setNewPageContent] = useState("");
  const { toast } = useToast();

  // Redirect if not admin
  if (!roleLoading && !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchPages();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          created_at
        `);

      if (profilesError) throw profilesError;

      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get auth users info
      const userIds = profiles?.map(p => p.id) || [];
      const authUsersPromises = userIds.map(async (id) => {
        try {
          const { data } = await supabase.auth.admin.getUserById(id);
          return data.user;
        } catch (error) {
          console.error(`Error fetching user ${id}:`, error);
          return null;
        }
      });

      const authUsers = await Promise.all(authUsersPromises);

      const usersWithRoles = profiles?.map(profile => {
        const authUser = authUsers.find(au => au?.id === profile.id);
        const userRoleData = userRoles?.filter(ur => ur.user_id === profile.id) || [];
        
        return {
          id: profile.id,
          email: authUser?.email || 'Unknown',
          first_name: profile.first_name,
          last_name: profile.last_name,
          created_at: profile.created_at,
          roles: userRoleData.map(ur => ur.role)
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUser,
          role: selectedRole as "admin" | "moderator" | "user"
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Role assigned successfully"
      });

      fetchUsers();
      setSelectedUser("");
      setSelectedRole("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pages",
        variant: "destructive"
      });
    } finally {
      setPagesLoading(false);
    }
  };

  const handleUpdatePage = async (pageId: string, title: string, content: string) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .update({
          title,
          content: { text: content },
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page updated successfully"
      });

      fetchPages();
      setEditingPage(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleCreatePage = async () => {
    if (!newPageTitle || !newPageSlug || !newPageContent) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('page_content')
        .insert({
          title: newPageTitle,
          page_slug: newPageSlug,
          content: { text: newPageContent },
          published: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page created successfully"
      });

      fetchPages();
      setNewPageTitle("");
      setNewPageSlug("");
      setNewPageContent("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleTogglePublished = async (pageId: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .update({ published: !published })
        .eq('id', pageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Page ${!published ? 'published' : 'unpublished'} successfully`
      });

      fetchPages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (roleLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Sue&Mon Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦2.4M</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="pages">Page Content</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assign User Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button onClick={handleRoleChange} disabled={!selectedUser || !selectedRole}>
                    Assign Role
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                          {user.first_name && user.last_name 
                            ? `${user.first_name} ${user.last_name}` 
                            : 'Not provided'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {user.roles.map((role) => (
                              <Badge 
                                key={role} 
                                variant={role === 'admin' ? 'default' : 'secondary'}
                              >
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Blog post management features will be implemented here. This will include creating, editing, and publishing blog posts.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages" className="space-y-6">
            {/* Create New Page */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Page
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Page Title</label>
                    <Input
                      value={newPageTitle}
                      onChange={(e) => setNewPageTitle(e.target.value)}
                      placeholder="Enter page title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Page Slug</label>
                    <Input
                      value={newPageSlug}
                      onChange={(e) => setNewPageSlug(e.target.value)}
                      placeholder="Enter page slug (e.g., about-us)"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={newPageContent}
                    onChange={(e) => setNewPageContent(e.target.value)}
                    placeholder="Enter page content"
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreatePage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Page
                </Button>
              </CardContent>
            </Card>

            {/* Existing Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Existing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {pagesLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Loading pages...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pages.map((page) => (
                      <Card key={page.id} className="border-l-4 border-l-primary/20">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{page.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">/{page.page_slug}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={page.published ? "default" : "secondary"}>
                                {page.published ? "Published" : "Draft"}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTogglePublished(page.id, page.published)}
                              >
                                {page.published ? "Unpublish" : "Publish"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingPage(editingPage === page.id ? null : page.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        {editingPage === page.id && (
                          <CardContent className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Title</label>
                              <Input
                                defaultValue={page.title}
                                id={`title-${page.id}`}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Content</label>
                              <Textarea
                                defaultValue={typeof page.content === 'object' ? page.content.text : page.content}
                                rows={6}
                                id={`content-${page.id}`}
                              />
                            </div>
                            <Button
                              onClick={() => {
                                const titleInput = document.getElementById(`title-${page.id}`) as HTMLInputElement;
                                const contentInput = document.getElementById(`content-${page.id}`) as HTMLTextAreaElement;
                                handleUpdatePage(page.id, titleInput.value, contentInput.value);
                              }}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Product management features will be implemented here. This will include adding, editing, and managing tea and spice inventory.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Order management features will be implemented here. This will include viewing, processing, and fulfilling customer orders.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    System configuration options will be available here, including site settings, payment configuration, and other administrative tools.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;