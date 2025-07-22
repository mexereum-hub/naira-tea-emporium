import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Save, Trash2, Eye, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogManagementProps {
  blogPosts: BlogPost[];
  blogLoading: boolean;
  onRefresh: () => void;
}

export const BlogManagement = ({ blogPosts, blogLoading, onRefresh }: BlogManagementProps) => {
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "general",
    image_url: ""
  });
  const { toast } = useToast();

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !newPost.author) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert(newPost);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully"
      });

      setNewPost({
        title: "",
        content: "",
        excerpt: "",
        author: "",
        category: "general",
        image_url: ""
      });
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdatePost = async (postId: string, title: string, content: string, excerpt: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ title, content, excerpt })
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });

      setEditingBlog(null);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleTogglePublished = async (postId: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !published })
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Post ${!published ? 'published' : 'unpublished'} successfully`
      });

      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });

      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Enter post title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Author *</label>
              <Input
                value={newPost.author}
                onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                placeholder="Enter author name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="recipes">Recipes</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={newPost.image_url}
                onChange={(e) => setNewPost({...newPost, image_url: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea
              value={newPost.excerpt}
              onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
              placeholder="Enter post excerpt"
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Content *</label>
            <Textarea
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              placeholder="Enter post content"
              rows={6}
            />
          </div>
          <Button onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </CardContent>
      </Card>

      {/* Existing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {blogLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Loading posts...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="border-l-4 border-l-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          By {post.author} • {post.category} • {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublished(post.id, post.published)}
                        >
                          {post.published ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingBlog(editingBlog === post.id ? null : post.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingBlog === post.id && (
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          defaultValue={post.title}
                          id={`title-${post.id}`}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Excerpt</label>
                        <Textarea
                          defaultValue={post.excerpt}
                          rows={2}
                          id={`excerpt-${post.id}`}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          defaultValue={post.content}
                          rows={6}
                          id={`content-${post.id}`}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          const titleInput = document.getElementById(`title-${post.id}`) as HTMLInputElement;
                          const excerptInput = document.getElementById(`excerpt-${post.id}`) as HTMLTextAreaElement;
                          const contentInput = document.getElementById(`content-${post.id}`) as HTMLTextAreaElement;
                          handleUpdatePost(post.id, titleInput.value, contentInput.value, excerptInput.value);
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
    </div>
  );
};
