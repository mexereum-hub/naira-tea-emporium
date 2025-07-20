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
import { Users, Package, ShoppingCart, BarChart3, Settings, LogOut, Shield } from "lucide-react";
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

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const { toast } = useToast();

  // Redirect if not admin
  if (!roleLoading && !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
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
          
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Page Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Dynamic page content management will be implemented here. This will include editing content for Story, FAQ, Benefits, and other pages.
                  </AlertDescription>
                </Alert>
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