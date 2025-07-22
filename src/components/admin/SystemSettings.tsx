import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SystemSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface SystemSettingsProps {
  settings: SystemSetting[];
  settingsLoading: boolean;
  onRefresh: () => void;
}

export const SystemSettings = ({ settings, settingsLoading, onRefresh }: SystemSettingsProps) => {
  const [editingSetting, setEditingSetting] = useState<string | null>(null);
  const [newSetting, setNewSetting] = useState({
    key: "",
    value: "",
    description: ""
  });
  const { toast } = useToast();

  const handleCreateSetting = async () => {
    if (!newSetting.key || !newSetting.value) {
      toast({
        title: "Error",
        description: "Please fill in key and value fields",
        variant: "destructive"
      });
      return;
    }

    try {
      let value;
      try {
        value = JSON.parse(newSetting.value);
      } catch {
        value = newSetting.value;
      }

      const { error } = await supabase
        .from('system_settings')
        .insert({
          key: newSetting.key,
          value: value,
          description: newSetting.description
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Setting created successfully"
      });

      setNewSetting({ key: "", value: "", description: "" });
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateSetting = async (settingId: string, key: string, value: string, description: string) => {
    try {
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch {
        parsedValue = value;
      }

      const { error } = await supabase
        .from('system_settings')
        .update({
          key,
          value: parsedValue,
          description
        })
        .eq('id', settingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Setting updated successfully"
      });

      setEditingSetting(null);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatValue = (value: any) => {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <div className="space-y-6">
      {/* Create New Setting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Setting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Key *</label>
              <Input
                value={newSetting.key}
                onChange={(e) => setNewSetting({...newSetting, key: e.target.value})}
                placeholder="setting_key"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Value *</label>
              <Input
                value={newSetting.value}
                onChange={(e) => setNewSetting({...newSetting, value: e.target.value})}
                placeholder="Setting value (JSON or string)"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={newSetting.description}
              onChange={(e) => setNewSetting({...newSetting, description: e.target.value})}
              placeholder="Setting description"
              rows={2}
            />
          </div>
          <Button onClick={handleCreateSetting}>
            <Plus className="h-4 w-4 mr-2" />
            Add Setting
          </Button>
        </CardContent>
      </Card>

      {/* Settings Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {settingsLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Loading settings...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {settings.map((setting) => (
                <Card key={setting.id} className="border-l-4 border-l-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{setting.key}</CardTitle>
                        {setting.description && (
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSetting(editingSetting === setting.id ? null : setting.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingSetting === setting.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Key</label>
                          <Input
                            defaultValue={setting.key}
                            id={`key-${setting.id}`}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Value</label>
                          <Textarea
                            defaultValue={formatValue(setting.value)}
                            id={`value-${setting.id}`}
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            defaultValue={setting.description || ""}
                            id={`description-${setting.id}`}
                            rows={2}
                          />
                        </div>
                        <Button
                          onClick={() => {
                            const keyInput = document.getElementById(`key-${setting.id}`) as HTMLInputElement;
                            const valueInput = document.getElementById(`value-${setting.id}`) as HTMLTextAreaElement;
                            const descInput = document.getElementById(`description-${setting.id}`) as HTMLTextAreaElement;
                            handleUpdateSetting(setting.id, keyInput.value, valueInput.value, descInput.value);
                          }}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-muted p-3 rounded-md">
                        <pre className="text-sm whitespace-pre-wrap">
                          {formatValue(setting.value)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};